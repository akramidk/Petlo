module AutoshipsHelper::Index
  LIMIT = 100

  def index(customer:, page:)
    offset = (LIMIT * page) - LIMIT

    autoships = []

    customer.autoships.limit(LIMIT + 1).offset(offset).each do |autoship|
      data = {
        public_id: autoship.public_id,
        name: autoship.name,
        status: autoship.status,
        next_shipment_on: autoship.next_shipment_on,
        address_id: Address.find_by(id: autoship.address_id).public_id,
        payment_method: autoship.payment_method,
        payment_card_id: autoship.payment_card_id ? Card.find_by(id: autoship.payment_card_id).public_id : nil,
        recurring_interval: autoship.recurring_interval,
        recurring_interval_count: autoship.recurring_interval_count,
        items: get_items(autoship: autoship),
        pets: get_pets(autoship: autoship)
      }

      autoships << data
    end

    { has_more: !!autoships[LIMIT], data: autoships[0..LIMIT-1] }
  end

  private
  def get_items(autoship:)
    items = []

    autoship.items.each do |autoship_item|
      item_public_id = Item.find_by(id: autoship_item.item_id).public_id
      variant_public_id = Variant.find_by(id: autoship_item.variant_id, item_id: autoship_item.item_id).public_id

      items = {
        item_id: item_public_id,
        variant_public_id: variant_public_id,
        quantity: autoship_item.quantity
      }
    end

    items
  end

  def get_pets(autoship:)
    pets = []

    autoship.pets.each do |pet|
      pets << Pet.find_by(id: pet.pet_id).public_id
    end

    pets
  end
end
