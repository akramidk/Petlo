module CartsHelper::Create
    def create(customer:, language:)
        cart = Cart.create!(customer_id: customer.id)
        cart.summary(country: customer.country, language: language)
    end
end