module CardsHelper::Create
  PROCESSOR = "Stripe"

  @@customer = nil

  def create(customer:, token:)
    begin
      @@customer = customer
      create_a_stripe_customer if !@@customer.stripe_id

      response = GatewayLib.create_a_card(
        processor: PROCESSOR,
        data: {
          customer_id: @@customer.stripe_id,
          token: token
        }
      )

      Card.create!(
        customer_id: @@customer.id,
        processor: PROCESSOR,
        processor_card_id: response[:processor_card_id],
        brand: response[:brand],
        last4: response[:last4],
        exp_month: response[:exp_month],
        exp_year: response[:exp_year],
        fingerprint: response[:fingerprint]
      )
    end
  end

  private
  def create_a_stripe_customer
    stripe_id = GatewayLib.create_a_customer(
      processor: PROCESSOR,
      data: {
        public_id: @@customer.public_id
      }
    )

    @@customer.update(stripe_id: stripe_id)
  end
end