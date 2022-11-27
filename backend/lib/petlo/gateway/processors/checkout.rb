class CheckoutLib
  class << self
    API_URL = Rails.application.credentials[:checkout][Rails.env.to_sym][:api_url]
    SECRET_KEY = Rails.application.credentials[:checkout][Rails.env.to_sym][:secret_key]

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
        {
          status: "failed"
        }
      end
    end
  end
end
