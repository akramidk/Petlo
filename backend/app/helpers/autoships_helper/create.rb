module AutoshipsHelper::Create
  def create(customer:, name:, recurring_interval:, recurring_interval_count:, starting_from:, items:, payment:, pets:)
    raise(RuntimeError, 3007000) unless recurring_interval
    raise(RuntimeError, 3007001) unless recurring_interval_count
    raise(RuntimeError, 3007002) unless starting_from
    raise(RuntimeError, 3007003) unless items
    raise(RuntimeError, 3007004) unless payment

    _items = []
    items.each do |item|
      _item = Item.find_by(public_id: item.id)
      raise(RuntimeError, 3007005) unless _item

      variant = _item.variants.find_by(public_id: item.variant_id)
      raise(RuntimeError, 3007006) unless variant

      _items << {
        id: _item.id,
        variant_id: variant_id.id,
        quantity: item.quantity
      }
    end

    payment_card_id = nil
    if payment.method == 'card'
      payment_card_id = customer.cards.find_by(public_id: payment.card.id)&.id
      raise(RuntimeError, 3007007) unless payment_card_id
    end

    pets_id = []
    pets&.each do |public_id|
      pet = customer.pets.find_by(public_id: public_id)
      raise(RuntimeError, 3007008) unless pet

      pets_id << pet.id
    end
  end
end