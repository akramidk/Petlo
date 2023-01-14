module CustomersHelper::ResetPassword
    def reset_password(customer:, new_password:)
        customer.update!(password: new_password)

        session_token = SessionToken.generate(
            public_id: customer.public_id,
            phone_number: customer.phone_number
        )

        { customer: { name: customer.name, session_token: session_token  } }
    end
end