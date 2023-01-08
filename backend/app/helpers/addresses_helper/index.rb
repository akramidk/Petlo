module AddressesHelper::Index
    LIMIT  = 16
    
    def index(customer:, language:, page:)
      offset = (LIMIT * page) - LIMIT
      addresses = customer.addresses.limit(LIMIT + 1).offset(offset).map{|address| {
        public_id: address.public_id,
        name: address.name
      }}
  
      { has_more: !!addresses[LIMIT], data: addresses[0..LIMIT-1] }
    end
end