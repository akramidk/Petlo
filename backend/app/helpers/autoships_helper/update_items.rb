module AutoshipsHelper::UpdateItems
  def update_items(customer:, public_id:, items:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

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

    autoship.items.destroy_all
    _items.each do |item|
      AutoshipItem.create!(autoship_id: autoship.id, item_id: item[:id], variant_id: item[:variant_id], quantity: item[:quantity])
    end
  end
end
