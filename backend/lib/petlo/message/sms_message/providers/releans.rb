class Releans
  SECRET_KEY = Rails.application.credentials[:releans][:secret_key]
  SENDER_NAME = "Petlo"

  @@to = nil
  @@content = nil

  def self.send(to:, content:)
    @@to = to
    @@content = content

    response = request

    return "failed" unless response.code == 201
    "succeeded"
  end

  private
  def self.request
    HTTParty.post(
      "https://api.releans.com/v2/message",
      headers: {
        "Authorization": "Bearer #{SECRET_KEY}"
      },
      body:{
        sender: SENDER_NAME,
        mobile: @@to,
        content: @@content
      }
    )
  end
end
