module Customer::Verification
  require 'securerandom'

  def generate_verification_code(permission:)
    code = SecureRandom.random_number(100000..999999)

    self.update(
      verification_code: code,
      verification_code_permission: permission,
      verification_code_created_at: Time.now
    )

    code
  end

  def verify_verification_code(code:, permission:)
    if code != self.verification_code
      return { valid: false, message: "invalid_verification_code" }
    elsif permission != self.verification_code_permission
      return { valid: false, message: "invalid_permission" }
    elsif Time.now > (self.verification_code_created_at + 15.minutes)
      return { valid: false, message: "verification_code_expired" }
    end

    { valid: true }
  end
end
