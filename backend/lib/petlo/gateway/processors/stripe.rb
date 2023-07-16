class StripeLib
    class << self
        Stripe.api_key = ENV["STRIPE_SECRET_KEY"]

        def create_a_customer(data:)
            customer = Stripe::Customer.create({
                metadata: {
                    public_id: data[:public_id]
                }
            })

            customer.id
        end

        def create_a_card(data:)
            card = Stripe::Customer.create_source(
                data[:customer_id],
                {
                    source: data[:token]
                }
            )

            {
                processor_card_id: card.id,
                brand: card.brand.downcase,
                last4: card.last4,
                exp_month: card.exp_month,
                exp_year: card.exp_year,
                fingerprint: card.fingerprint
            }
        end

        def make_payment(data:)
            #TODO should handle other countries
            amount = Utils.number_to_usd(country: "JO", number: data[:amount])

            payment = Stripe::Charge.create({
                amount: amount,
                currency: "usd",
                source: data[:source],
                customer: data[:customer_id]
            })

            {
                processor_payment_id: payment.id
            }
        end
    end
end