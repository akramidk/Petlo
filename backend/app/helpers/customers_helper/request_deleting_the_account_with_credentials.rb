module CustomersHelper::RequestDeletingTheAccountWithCredentials
    def request_deleting_the_account_with_credentials(phone_number:, password:, language:)
        customer = Customer.find_by(phone_number: phone_number, deleted: nil)

        if customer && customer.try(:authenticate, password)
            Customer::VerificationJob.perform_async(
                customer.public_id,
                ENUM::PERMISSIONS[:DELETE_CUSTOMER],
                language
            )

            SessionToken.generate(
                public_id: customer.public_id,
                phone_number: customer.phone_number,
                limited: true,
                limited_for: ENUM::PERMISSIONS[:DELETE_CUSTOMER]
            )
        else
            raise(RuntimeError, 3003004)
        end
    end
end