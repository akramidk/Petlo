module CartsHelper::Create
    def create(customer:)
        Cart.create!(customer_id: customer.id)
    end
end