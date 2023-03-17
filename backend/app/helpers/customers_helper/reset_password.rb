module CustomersHelper::ResetPassword
    def reset_password(customer:, password:)
        Customer.validates_password(password: password)
        customer.update!(phone_verification_status: "verified", password: password)

        session_token = SessionToken.generate(
            public_id: customer.public_id,
            phone_number: customer.phone_number
        )

        { customer: { name: customer.name, session_token: session_token  } }
    end
end