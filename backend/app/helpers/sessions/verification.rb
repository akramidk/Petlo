module SessionsHelper
  def self.verification(customer:, verification_code:)
    checking = customer.verify_verification_code(
      code: verification_code,
      permission: ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION]
    )

    if checking[:valid]
      session_token = SessionToken.generate(
        public_id: customer.public_id,
        phone_number: customer.phone_number
      )

      { customer: { name: customer.name  }, session_token: session_token }
    else
      raise(checking[:message])
    end
  end
end
