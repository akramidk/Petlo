module OrdersHelper::Create
    PROCESSOR = "Stripe"

    def create(customer:, checkout_id:, payment:, pets:)
        checkout = customer.checkouts.find_by(public_id: checkout_id)
        raise(RuntimeError, 3006000) if !checkout
        raise(RuntimeError, 3006001) if checkout.used?
        raise(RuntimeError, 3006002) if checkout.created_at + CONSTANTS::TIMES[:CHECKOUT_EXP_AFTER] < Time.now
        raise(RuntimeError, 3006007) if !checkout.address_id

        cart = customer.carts.find_by(id: checkout.cart_id)
        raise(RuntimeError, 3006003) if !cart

        if payment[:method] === "card"
            begin
                payment[:processor_payment_id] = GatewayLib.make_payment(
                    processor: PROCESSOR,
                    data: {
                        amount: checkout.amount,
                        currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country]["en"],
                        source: payment[:card][:id]
                    }
                )
              rescue
                raise(RuntimeError, 3006006)
            end
        end

        order = Order.create!(
            customer_id: customer.id,
            address_id: checkout.address_id,
            cart_amount: checkout.cart_amount,
            delivery_amount: checkout.delivery_amount,
            amount: checkout.amount,
            currency: checkout.currency
        )

        cart.items.select(:item_id).group(:item_id).each do |cart_item|
            item_id = cart_item.item_id

            cart.items.where(item_id: item_id).select(:variant_id).group(:variant_id).count.each do |variant_id, quantity|
                variant = Variant.find_by(id: variant_id)
                price = variant.prices.find_by(country: customer.country).value

                OrderItem.create!(
                    order_id: order.id,
                    item_id: item_id,
                    variant_id: variant.id,
                    price: price,
                    quantity: quantity,
                    total_price: price * quantity
                )
            end
        end

        pets&.each do |public_id|
            pet = customer.pets.find_by(public_id: public_id)
            next if !pet

            OrderPet.create!(
                order_id: order.id,
                pet_id: pet.id
            )
        end

        payment = Payment.create!(
            order_id: order.id,
            status: payment[:method] === "card" ? "collected" : "uncollected",
            method: payment[:method]
        )

        if payment[:method] === "card"
            CardPayment.create!(
                payment_id: payment.id,
                card_id: payment[:card][:id],
                processed_by: PROCESSOR,
                processor_payment_id: payment[:processor_payment_id]
            )
        end

        #checkout.used!
    end
end