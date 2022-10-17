module CustomersHelper
  def self.verification(customer:, verification_code:)
    return { body: { status: "failed", message: "customer_verified_before" }, status: 400 } if customer.phone_verified?

    checking = customer.verify_verification_code(
      code: verification_code,
      permission: "customer_verification" 
    )

    if checking[:valid]
      customer.phone_verified!
      { body: { status: "succeeded"  }, status: 200  }
    else
      { body: { status: "failed", message: checking[:message]  }, status: 400  }
    end
  end
end
