module CardsHelper::Create

  PROCESSOR = "Checkout"

  def create(customer:, token:)
    begin
      response = GatewayLib.create_a_card(
        processor: PROCESSOR,
        data: {
          token: token
        }
      )

      if response[:status] == "succeeded"
        Card.create!(
          customer_id: customer.id,
          processor: PROCESSOR,
          processor_card_id: response[:data][:processor_card_id],
          brand: response[:data][:brand],
          last4: response[:data][:last4],
          exp_month: response[:data][:exp_month],
          exp_year: response[:data][:exp_year],
          fingerprint: response[:data][:fingerprint]
        )
      else
        raise(RuntimeError)
      end
    end
  end
end