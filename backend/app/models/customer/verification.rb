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
end
