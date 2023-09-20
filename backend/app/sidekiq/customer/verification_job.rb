class Customer::VerificationJob
  include Sidekiq::Job

  DEFAULT_LANGUAGE = "ar"
  MESSAGES = {
    ENUM::PERMISSIONS[:CUSTOMER_VERIFICATION] => {
      "ar" => "رمز التحقق الخاص بك هو",
      "en" => "Your verification code is"
    },

    ENUM::PERMISSIONS[:SESSION_VERIFICATION] => {
      "ar" => "رمز التحقق الخاص بك هو",
      "en" => "Your verification code is"
    },

    ENUM::PERMISSIONS[:DELETE_CUSTOMER] => {
      "ar" => "رمز التحقق الخاص بك ﻹكمال حذف حسابك",
      "en" => "Your verification code to complete deleting your account is"
    },

    ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST] => {
      "ar" => "رمز التحقق الخاص بك لتعيين كلمة المرور",
      "en" => "Your verification code to reset your password is"
    },

    ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PASSWORD] => {
      "ar" => "رمز التحقق الخاص بك لتغيير كلمة المرور",
      "en" => "Your verification code to change your password is"
    }
  }

  def perform(public_id, permission, language=DEFAULT_LANGUAGE)
    customer = Customer.find_by(public_id: public_id)
    code = customer.generate_verification_code(permission: permission)
    message_content = "#{MESSAGES[permission][language]} #{code}"

    #stores phone number is an account used by Apple & Google, to test the app
    #so no need to send an OTP because we should have a fixed OTP
    SMSMessage.send(to: customer.phone_number, content: message_content) if customer.phone_number != CONSTANTS::STORES_PHONE_NUMBER
  end
end
