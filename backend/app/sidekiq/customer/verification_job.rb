class Customer::VerificationJob
  include Sidekiq::Job

  MESSAGES = {
    "customer_verification" => {
      "ar" => "رمز التحقق الخاص بك هو",
      "en" => "Your verification code is"
    }
  }

  def perform(public_id, permission, language)
    customer = Customer.find_by(public_id: public_id)
    code = customer.generate_verification_code(permission: permission)
    message_content = "#{MESSAGES[permission][language]} #{code}"

    SMSMessage.send(to: customer.phone_number, content: message_content)
  end
end
