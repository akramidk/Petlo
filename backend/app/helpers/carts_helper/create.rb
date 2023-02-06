module CartsHelper::Create
    def create(customer:)
        cart = Cart.create!(customer_id: customer.id)

        {
            public_id: cart.public_id,
            exp_at: cart.created_at + 24.hours
        }
    end
end