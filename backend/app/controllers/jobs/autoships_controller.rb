=begin
 1. round 1 will charge the today autoships cash/card and the tomorrow card autoships
 2. round 2 will charge the today card autoships
=end

module Jobs
  class AutoshipsController < ApplicationController
    before_action :check_jobs_key

    PROCESSOR = "Stripe"

    @@round = nil
    
    def charge
      @@round = params[:round]
      @@country = params[:country]
      autoships = @@round == 1 ? cash_autoships + card_autoships : card_autoships

      autoships.each do |autoship|
        items_for_calculation = []
        items_for_order = []
        payment_response = nil
        card = nil

        autoship.items.each do |auto_item|
          item = Item.find_by(id: auto_item.item_id)
          variant = Variant.find_by(id: auto_item.variant_id)
          price = variant.prices.find_by(country: @@country).value

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

        items_calculation = Utils.autoship_items_calculation(country: @@country, data: items_for_calculation, language: "en")
        cart_amount = items_calculation[:amount_after_discount]
        delivery_amount = CONSTANTS::DELIVERY_COSTS[@@country]
        amount = cart_amount + delivery_amount
        currency  = CONSTANTS::COUNTRIES_CURRENCIES[@@country]["en"]

        if autoship.payment_method == "card"
          card = Card.find_by(id: autoship.payment_card_id)

          begin
              payment_response = GatewayLib.make_payment(
                  processor: PROCESSOR,
                  data: {
                      amount: amount,
                      currency: CONSTANTS::COUNTRIES_CURRENCIES[@@country]["en"].downcase,
                      source: card.processor_card_id,
                      customer_id: autoship.customer.stripe_id
                  }
              )
            rescue
              collect_payment_attempts = autoship.next_shipment_collect_payment_attempts ? autoship.next_shipment_collect_payment_attempts + 1 : 1

              if collect_payment_attempts > 2
                autoship.update(status: "inactive", next_shipment_collect_payment_attempts: collect_payment_attempts)
              else
                autoship.update(next_shipment_collect_payment_attempts: collect_payment_attempts)
              end

              next
          end
        end

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

        if autoship.payment_method == "card"
          CardPayment.create!(
            payment_id: payment.id,
            card_id: card.id,
            processed_by: PROCESSOR,
            processor_payment_id: payment_response[:processor_payment_id]
          )
        end

        #TODO you should rename autoship_date_after_the_skip to somthing generic
        next_shipment_on = Utils.autoship_date_after_the_skip(
          next_shipment_on: autoship.next_shipment_on,
          recurring_interval: autoship.recurring_interval,
          recurring_interval_count: autoship.recurring_interval_count
        )

        autoship.update(next_shipment_on: next_shipment_on, next_shipment_collect_payment_attempts: nil)
      end

      render json: { status: "succeeded" }, status: 200
    end

    private
    def cash_autoships
      next_shipment_on = next_shipment_on(payment_method: "cash")
      Autoship.where(status: "active", payment_method: "cash", next_shipment_on: next_shipment_on)
    end

    def card_autoships
      next_shipment_on = next_shipment_on(payment_method: "card")
      Autoship.where(status: "active", payment_method: "card", next_shipment_on: next_shipment_on)
    end

    def next_shipment_on(payment_method:)
      today_time = Utils.utc_to_local_time(country: @@country)
      today_date = Date.new(today_time.year, today_time.month, today_time.day)

      if payment_method == "card"
        tomorrow_time = today_time + 24.hour
        tomorrow_date = Date.new(tomorrow_time.year, tomorrow_time.month, tomorrow_time.day)

        if @@round == 1
          [today_date, tomorrow_date]
        else
          tomorrow_date
        end
      else
        today_date
      end
    end
  end
end