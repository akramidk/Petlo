module Dashboard
  class ItemsController < ApplicationController
    before_action :check_dashboard_key

    def create
      brand = Brand.find_by(public_id: params[:barnd_public_id])
      item = Item.create!(brand_id: brand.id)

      #image
      image = params[:image].split(',')
      content_type = image[0].split(":")[1].split(";")[0]
      abbreviation = content_type.split("/")[1]
      base64 = image[1]
      item.image.attach(
        io: StringIO.new(Base64.decode64(base64)),
        content_type: content_type,
        filename: "#{item.public_id}.#{abbreviation}"
      )

      #details
      ItemDetail.create!(item_id: item.id, language: "en", name: params[:en_name])
      ItemDetail.create!(item_id: item.id, language: "ar", name: params[:ar_name])

      #availability
      ItemAvailability.create!(item_id: item.id, country: "JO", value: false)

      #options
      params[:options].each do |data|
        option = Option.create!(item_id: item.id, weighted: data[:weighted], unit: data[:weighted] ? data[:unit] : nil)

        #names
        OptionName.create!(option_id: option.id, language: "en", value: data[:en_name])
        OptionName.create!(option_id: option.id, language: "ar", value: data[:ar_name])

        #values
        number = 1
        data[:values].each do |value|
          OptionValue.create!(option_id: option.id, number: number, language: "en", value: value[:en])
          OptionValue.create!(option_id: option.id, number: number, language: "ar", value: value[:ar])

          number += 1
        end
      end

      options = []
      item.options.each do |option|
        values = []

        option.values.where(language: "en").each do |value|
          values << {id: option.id, number: value.number}
        end

        options << values
      end

      options_combinations = options.length === 1 ? options[0].product() : options[0].product(*options[1..-1])

      options_combinations.each do |option|
        variant = Variant.create!(item_id: item.id)

        option.each do |value|
          VariantOption.create!(variant_id: variant.id, option_id: value[:id], option_value_number: value[:number])
        end
      end

      variants = item.variants.map{ |variant|
        {
          public_id: variant.public_id,
          options: variant.options.map{|option|
            option.values.find_by(language: "en").value
          },
          price: nil,
          available: nil,
        }
      }

      render json: { status: "succeeded", item_public_id: item.public_id, available: nil, variants: variants }, status: 200
    end

    def variants
      params[:variants].each do |data|
        variant = Variant.find_by(public_id: data[:public_id])

        VariantAvailability.create!(variant_id: variant.id, country: "JO", value: data[:available])
        VariantPrice.create!(variant_id: variant.id, country: "JO", value: data[:price])
      end

      item = Item.find_by(public_id: params[:item_public_id])
      item.availabilities.find_by(country: "JO").update(value: params[:available])

      render json: { status: "succeeded" }, status: 200
    end
  end
end