module Jobs
  class AutoshipsController < ApplicationController
    before_action :check_jobs_key


    def charge
      round = params[:round]
      country = params[:country]
      autoships = round == 1 ? cash_autoships(country: country) : cash_autoships(country: country)

      autoships.each do |autoship|
        items_for_calculation = []
        items_for_order = []

        autoship.items.each do |auto_item|
          item = Item.find_by(id: auto_item.item_id)
          variant = Variant.find_by(id: auto_item.variant_id)
          price = variant.prices.find_by(country: country).value

          items_for_calculation << {
            item_id: item.public_id,
            variant_id: variant.public_id,
            quantity: auto_item.quantity
          }

          items_for_order << {
            item_id: item.id,
            variant_id: variant.id,
            quantity: auto_item.quantity,
            price: price,
            total_price: price * auto_item.quantity
          }
        end

        items_calculation = Utils.autoship_items_calculation(country: country, data: items_for_calculation, language: "en")
        cart_amount = items_calculation[:amount_after_discount]
        delivery_amount = CONSTANTS::DELIVERY_COSTS[country]
        amount = cart_amount + delivery_amount
        currency  = CONSTANTS::COUNTRIES_CURRENCIES[country]["en"]

        order = Order.create!(
          customer_id: autoship.customer_id,
          address_id: autoship.address_id,
          autoship_id: autoship.id,
          cart_amount: cart_amount,
          delivery_amount: delivery_amount,
          amount: amount,
          currency: currency
        )

        items_for_order.each do |item|
          OrderItem.create!(
            order_id: order.id,
            item_id: item[:item_id],
            variant_id: item[:variant_id],
            price: item[:price],
            quantity: item[:quantity],
            total_price: item[:total_price]
          )
        end

        autoship.pets.each do |pet|
          OrderPet.create!(
            order_id: order.id,
            pet_id: pet.pet_id
          )
        end

        payment = Payment.create!(
          order_id: order.id,
          status: autoship.payment_method == "card" ? "collected" : "uncollected",
          method: autoship.payment_method
        )

        #if autoship.payment_method == "card"
        #  CardPayment.create!(
        #    payment_id: payment.id,
        #    card_id: @card.id,
        #    processed_by: PROCESSOR,
        #    processor_payment_id: @payment_response[:processor_payment_id]
        #  )
        #end
      end

      render json: { status: "succeeded" }, status: 200
    end

    private

    def cash_autoships(country:)
      next_shipment_on = next_shipment_on(payment_method: "cash")
      Autoship.where(status: "active", payment_method: "cash", next_shipment_on: next_shipment_on)
    end

    def next_shipment_on(payment_method:)
      current_time = payment_method == "card" ? Time.now + 24.hour : Time.now
      Date.new(current_time.year, current_time.month, current_time.day)
    end
  end
end