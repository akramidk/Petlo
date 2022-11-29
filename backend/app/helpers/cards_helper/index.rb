module CardsHelper::Index
  LIMIT  = 16
  
  def index(customer:, page:)
    offset = (LIMIT * page) - LIMIT
    cards = customer.cards.limit(LIMIT + 1).offset(offset).map{|card| {
      public_id: card.public_id,
      brand: card.brand,
      last4: card.last4,
      exp_month: card.exp_month,
      exp_year: card.exp_year
    }}

    { has_more: !!cards[LIMIT], data: cards[0..LIMIT-1] }
  end
end
