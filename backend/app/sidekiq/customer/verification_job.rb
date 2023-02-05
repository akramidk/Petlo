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
      "en" => "Your verification code to chnage your password is"
    }
  }

  def perform(public_id, permission, language=DEFAULT_LANGUAGE)
    customer = Customer.find_by(public_id: public_id)
    code = customer.generate_verification_code(permission: permission)
    message_content = "#{MESSAGES[permission][language]} #{code}"

    # SMSMessage.send(to: customer.phone_number, content: message_content)
  end
end
