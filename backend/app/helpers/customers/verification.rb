module CustomersHelper
  def self.verification(customer:, verification_code:)
    raise("customer_verified_before") if customer.phone_verified?

    checking = customer.verify_verification_code(
      code: verification_code,
      permission: "customer_verification" 
    )

    if checking[:valid]
      customer.phone_verified!
    else
      raise(checking[:message])
    end
  end
end
