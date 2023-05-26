module AutoshipsHelper::Create
  def create(customer:, name:, recurring_interval:, recurring_interval_count:, next_shipment_on:, items:, address_id:, payment:, pets:)
    splitted_next_shipment_on = next_shipment_on.split("-")
    next_shipment_on = Date.new(
      splitted_next_shipment_on[0].to_i,
      splitted_next_shipment_on[1].to_i,
      splitted_next_shipment_on[2].to_i
    )
    raise(RuntimeError, 3007005) unless next_shipment_on > Time.now.to_date

    address = customer.addresses.find_by(public_id: address_id)
    raise(RuntimeError, 3007004) unless address

    payment_card_id = nil
    if payment[:method] == 'card'
      payment_card_id = customer.cards.find_by(public_id: payment.card.id)&.id
      raise(RuntimeError, 3007002) unless payment_card_id
    end

    pets_id = []
    pets&.each do |public_id|
      pet = customer.pets.find_by(public_id: public_id)
      raise(RuntimeError, 3007003) unless pet

      pets_id << pet.id
    end

    _items = []
    items.each do |item|
      _item = Item.joins(
        :availabilities
      ).where(availabilities: {
        country: customer.country,
        value: true
      }).find_by(
        public_id: item[:id]
      )
      raise(RuntimeError, 3007000) unless _item

      variant = _item.variants.joins(
        :availabilities
      ).where(availabilities: {
        country: customer.country,
        value: true
      }).find_by(
        public_id: item[:variant_id]
      )
      raise(RuntimeError, 3007001) unless variant

      _items << {
        id: _item.id,
        variant_id: variant.id,
        quantity: item[:quantity]
      }
    end

    Autoship.create!(
      customer_id: customer.id,
      name: name,
      status: "active",
      address_id: address.id,
      payment_method: payment[:method],
      payment_card_id: payment_card_id,
      recurring_interval: recurring_interval,
      recurring_interval_count: recurring_interval_count,
      next_shipment_on: next_shipment_on
    )
  end
end