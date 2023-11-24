module Dashboard
  class OverviewController < ApplicationController
    PASSKEY = "oweeMOr05GkBEHieCM8ZUNTUDzV4e9dWo"

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
        brand = BrandName.find_by(brand_id: item.brand.id, language: "en")
        options = Variant.find_by(id: order_item[:variant_id]).options.map{|option| 
          OptionValue.find_by(option_id: option.id, language: "en").slice("value", "unit")
        }

        items << {
          public_id: item[:public_id],
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
      render json: { data: get_autoships.map{|autoship| autoship.as_json.except("id")} }
    end

    private
    def get_orders
      Order.where.not(status: "delivered")
    end

    def get_autoships
      Autoship.where(status: "active")
    end
  end
end