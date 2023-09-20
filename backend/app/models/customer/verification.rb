module Customer::Verification
  require 'securerandom'

  FIXED_CODE = "238766"

  def generate_verification_code(permission:)
    #Apple & Google need a phone number with a fixed OTP to test the app
    #so if the customer phone number is the same as stores phone number use the FIXED_CODE
    code = self.phone_number == CONSTANTS::STORES_PHONE_NUMBER ? FIXED_CODE : SecureRandom.random_number(100000..999999).to_s

    self.update!(
      verification_code: code,
      verification_code_permission: permission,
      verification_code_created_at: Time.now
    )

    code
  end

  def verify_verification_code(code:, permission:)
    if code != self.verification_code.to_i
      raise(RuntimeError, 2000009)
    elsif permission != self.verification_code_permission
      raise(RuntimeError, 2000010)
    elsif Time.now > (self.verification_code_created_at + CONSTANTS::TIMES[:VERIFICATION_CODE_EXP_AFTER])
      raise(RuntimeError, 2000011)
    end

    reset_verification
    { valid: true  }
  end

  private
  def reset_verification
    self.update!(
      verification_code: nil,
      verification_code_permission: nil,
      verification_code_created_at: nil
    )
  end
end
