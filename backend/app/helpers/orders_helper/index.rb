module OrdersHelper::Index
    LIMIT  = 100

    def index(customer:, page:, language:)
        offset = (LIMIT * page) - LIMIT
        orders = customer.orders.limit(LIMIT + 1).offset(offset).map{|order| {
            id: order.id + 888888,
            public_id: order.public_id,
            status: order.status,
            autoship: !!order.autoship_id,
            amount: order.amount,
            payment: {
                method: order.payment.method,
            },
            currency: CONSTANTS::COUNTRIES_CURRENCIES[customer.country][language],
            date: order.created_at
          }}

        { has_more: !!orders[LIMIT], data: orders[0..LIMIT-1] }
    end
end