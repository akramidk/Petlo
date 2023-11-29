module Dashboard
  class OverviewController < ApplicationController
    PASSKEY = "oweeMOr05GkBEHieCM8ZUNTUDzV4e9dWo"

    include AutoshipsHelper

    def index
      raise("1000000") if params[:passkey] != PASSKEY

      customers = Customer.all.length
      orders = get_orders.length
      active_autoships = get_autoships.length
      autoships_for_the_next_10_days = []
      
      10.times.each do |i|
        time = Time.now + (i + 1).days
        autoships = Autoship.where(status: "active", next_shipment_on: time)

        autoships_for_the_next_10_days << {
          date: "#{time.day}/#{time.month}/#{time.year}",
          number_of_autoships: autoships.length,
          autoship_public_ids: autoships.map{|autoship| autoship.public_id}
        }
      end

      render json: { customers: customers, orders: orders, active_autoships: active_autoships, autoships_for_the_next_10_days: autoships_for_the_next_10_days }, status: 200
    end

    def orders
      raise("1000000") if params[:passkey] != PASSKEY

      orders = get_orders.map { |order| order.as_json.except("id") }

      render json: { data: orders }, status: 200
    end

    def order
      raise("1000000") if params[:passkey] != PASSKEY

      order = Order.find_by(public_id: params[:public_id])
      customer = order.customer
      payment = order.payment
      address = order.address
      pets = order.pets
      items = []
      order.items.each do |order_item|
        item = Item.find_by(id: order_item[:item_id])
        name = ItemDetail.find_by(item_id: item.id, language: "en")
        brand = BrandName.find_by(brand_id: item.brand.id, language: "en")
        options = Variant.find_by(id: order_item[:variant_id]).options.map{|option| 
          OptionValue.find_by(option_id: option.option_id, language: "en", number: option.option_value_number).slice("value", "unit")
        }

        items << {
          public_id: item[:public_id],
          name: name,
          brand: brand,
          categories: item.categories,
          price: order_item[:price],
          options: options,
          quantity: order_item[:quantity],
          total_price: order_item[:total_price]
        }
      end

      render json: {
        customer: customer.slice("public_id", "name", "country", "phone_number"),
        order: order.as_json.except("id"),
        payment: payment.slice("method"),
        address: address.slice("latitude", "longitude", "details"),
        pets: pets.map{|pet_order| pet_order.pet.as_json.slice("name", "kind", "breed", "gender")},
        items: items
      }, status: 200
    end

    def autoships
      raise("1000000") if params[:passkey] != PASSKEY

      render json: { data: get_autoships.map{|autoship| autoship.as_json.except("id")} }, status: 200
    end

    def autoship
      raise("1000000") if params[:passkey] != PASSKEY

      autoship = Autoship.find_by(public_id: params[:public_id])
      customer = autoship.customer
      address = autoship.address.slice("latitude", "longitude", "details")
      pets = autoship.pets.map{|pet_order| pet_order.pet.as_json.slice("name", "kind", "breed", "gender")}
      items = get_autoship_items(autoship: autoship)

      render json: {
        autoship: autoship.slice("public_id", "name", "status", "payment_method", "recurring_interval", "recurring_interval_count", "next_shipment_on", "next_shipment_collect_payment_attempts"),
        customer: customer.slice("public_id", "name", "country", "phone_number"),
        address: address,
        pets: pets,
        calculation: AutoshipsHelper.items_calculation(
          customer: customer,
          data: items,
          language: "en"
        )
      }, status: 200
    end

    private
    def get_orders
      Order.where.not(status: ["delivered", "canceled"])
    end

    def get_autoships
      Autoship.where(status: "active")
    end

    def get_autoship_items(autoship:)
      items = []
  
      autoship.items.each do |autoship_item|
        item_public_id = Item.find_by(id: autoship_item.item_id).public_id
        variant_public_id = Variant.find_by(id: autoship_item.variant_id, item_id: autoship_item.item_id).public_id
  
        items << {
          item_id: item_public_id,
          variant_id: variant_public_id,
          quantity: autoship_item.quantity
        }
      end
  
      items
    end
  end
end