class Customer::VerificationJob
  include Sidekiq::Job

  DEFAULT_LANGUAGE = "ar"
  MESSAGES = {
    ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION] => {
      "ar" => "رمز التحقق الخاص بك هو",
      "en" => "Your verification code is"
    },

    ENUM::VERIFICATION_CODE_PERMISSIONS[:SESSION_VERIFICATION] => {
      "ar" => "رمز التحقق الخاص بك هو",
      "en" => "Your verification code is"
    },

    ENUM::VERIFICATION_CODE_PERMISSIONS[:DELETE_CUSTOMER] => {
      "ar" => "رمز التحقق الخاص بك ﻹكمال حذف حسابك",
      "en" => "Your verification code to complete deleting your account is"
    }
  }

  def perform(public_id, permission, language=DEFAULT_LANGUAGE)
    customer = Customer.find_by(public_id: public_id)
    code = customer.generate_verification_code(permission: permission)
    message_content = "#{MESSAGES[permission][language]} #{code}"

    # SMSMessage.send(to: customer.phone_number, content: message_content)
  end
end
