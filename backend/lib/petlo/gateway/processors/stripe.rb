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
    end
end