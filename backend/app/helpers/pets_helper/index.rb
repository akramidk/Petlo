module PetsHelper::Index
  LIMIT  = 100
  
  def index(customer:, language:, page:)
    offset = (LIMIT * page) - LIMIT
    pets = customer.pets.limit(LIMIT + 1).offset(offset).map{|pet| {
      public_id: pet.public_id,
      name: pet.name,
      kind: CONSTANTS::PETS[pet.kind][:name][language],
      #TODO should be without to_sym
      breed: CONSTANTS::PETS[pet.kind][:breeds][pet.breed.to_sym][language],
      gender: CONSTANTS::PET_GENDERS[pet.gender][language],
      image: pet.image.url
    }}

    { has_more: !!pets[LIMIT], data: pets[0..LIMIT-1] }
  end
end
