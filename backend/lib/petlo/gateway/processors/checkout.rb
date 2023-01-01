class CheckoutLib
  class << self
    API_URL = ENV["CHECKOUT_API_URL"]
    SECRET_KEY = ENV["CHECKOUT_SECRET_KEY"]

    def create_a_card(data:)
      response = HTTParty.post(
        "#{API_URL}/instruments",
        headers: {
          "Authorization": "Bearer #{SECRET_KEY}",
          "Content-Type" => "application/json"
        },
        body: {
          type: "token",
          token: data[:token]
        }.to_json
      )

      if response.code == 201
        {
          status: "succeeded",
          data: {
            processor_card_id: response["id"],
            brand: response["scheme"].downcase,
            last4: response["last4"],
            exp_month: response["expiry_month"],
            exp_year: response["expiry_year"],
            fingerprint: response["fingerprint"]
          }
        }
      else
        { status: "failed" }
      end
    end
  end
end
