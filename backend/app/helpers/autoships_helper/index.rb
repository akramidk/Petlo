module AutoshipsHelper::Index
  LIMIT = 100

  def index(customer:, page:)
    offset = (LIMIT * page) - LIMIT
    autoships = customer.autoships.limit(LIMIT + 1).offset(offset).map{|autoship| {
      public_id: autoship.public_id,
      name: autoship.name,
      status: autoship.status,
      next_shipment_on: autoship.next_shipment_on
    }}

    { has_more: !!autoships[LIMIT], data: autoships[0..LIMIT-1] }
  end
end
