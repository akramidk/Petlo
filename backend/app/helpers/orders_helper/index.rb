module OrdersHelper::Index
    LIMIT  = 100

    def index(customer:, page:, language:)
        offset = (LIMIT * page) - LIMIT
        orders = customer.orders.order(id: :desc).limit(LIMIT + 1).offset(offset).map{|order| {
            id: order.id + 81201,
            public_id: order.public_id,
            status: order.status,
            autoship: !!order.autoship_id,
            payment: {
                method: order.payment.method,
            },
            amount: Utils.number_to_currency(
                country: customer.country,
                number: order.amount
            ),
            currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language],
            date: order.created_at
          }}

        { has_more: !!orders[LIMIT], data: orders[0..LIMIT-1] }
    end
end