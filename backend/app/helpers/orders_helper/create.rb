module OrdersHelper::Create
    PROCESSOR = "Stripe"

    def create(customer:, checkout_id:, payment:, pets:)
        checkout = customer.checkouts.find_by(public_id: checkout_id)
        raise(RuntimeError, 3006000) if !checkout
        raise(RuntimeError, 3006001) if checkout.used?
        raise(RuntimeError, 3006002) if checkout.created_at + CONSTANTS::TIMES[:CHECKOUT_EXP_AFTER] < Time.now

        cart = customer.carts.find_by(id: checkout.cart_id)
        raise(RuntimeError, 3006003) if !cart
        raise(RuntimeError, 3006004) if cart.used?
        raise(RuntimeError, 3006005) if cart.created_at + CONSTANTS::TIMES[:CART_EXP_AFTER] < Time.now

        if payment[:type] === "card"
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

        payment = Payment.create!(
            order_id: order.id,
            status: payment[:type] === "card" ? "collected" : "uncollected",
            method: payment[:type]
        )

        if payment[:type] === "card"
            CardPayment.create!(
                payment_id: payment.id,
                card_id: payment[:card][:id],
                processed_by: PROCESSOR,
                processor_payment_id: payment[:processor_payment_id]
            )
        end
    end
end