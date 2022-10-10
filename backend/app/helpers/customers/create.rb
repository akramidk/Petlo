module CustomersHelper
  def self.create(name, country, phone_number, password)
    begin
      customer = Customer.create!(
        name: name,
        country: country,
        phone_number: phone_number,
        password: password
      )
      
      {
        body: {
          status: "succeeded"
        },
        status: 200
      }
    rescue ActiveRecord::RecordInvalid => invalid
      {
        body: {
          status: "failed",
          message: invalid.record.errors.objects.first.full_message
        },
        status: 400
      }
    end
  end
end
