module Customer::Verification
  require 'securerandom'

  def generate_verification_code(permission:)
    code = SecureRandom.random_number(100000..999999)

    self.update!(
      verification_code: code,
      verification_code_permission: permission,
      verification_code_created_at: Time.now
    )

    code
  end

  def verify_verification_code(code:, permission:)
    if code != self.verification_code
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
