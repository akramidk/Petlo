require 'rails_helper'
require_all 'lib/petlo'

RSpec.describe "SessionToken", type: :lib do
  customer = Customer.first

  it "is valied with limit" do
    limited_for = "bla"
    token = SessionToken.generate(
      public_id: customer.public_id,
      phone_number: customer.phone_number,
      limited: true,
      limited_for: limited_for
    )

    expect(token).not_to be_nil

    decoded_token = SessionToken.decode(token: token)

    expect(decoded_token["public_id"]).to eq(customer.public_id)
    expect(decoded_token["phone_number"]).to eq(customer.phone_number)
    expect(decoded_token["limited"]).to eq(true)
    expect(decoded_token["limited_for"]).to eq(limited_for)
    expect(decoded_token).to have_key("exp")
    expect(decoded_token).to have_key("created_at")
  end
  
  it "is valied without limit" do
    token = SessionToken.generate(
      public_id: customer.public_id,
      phone_number: customer.phone_number,
      limited: false,
    )

    expect(token).not_to be_nil

    decoded_token = SessionToken.decode(token: token)

    expect(decoded_token["public_id"]).to eq(customer.public_id)
    expect(decoded_token["phone_number"]).to eq(customer.phone_number)
    expect(decoded_token["limited"]).to eq(false)
    expect(decoded_token).not_to have_key("limited_for")
    expect(decoded_token).not_to have_key("exp")
    expect(decoded_token).to have_key("created_at")
  end
end
