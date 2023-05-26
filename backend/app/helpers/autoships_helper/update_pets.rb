module AutoshipsHelper::UpdatePets
  def update_pets(customer:, public_id:, pets:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    pets_id = []
    pets&.each do |pet_public_id|
      pet = customer.pets.find_by(public_id: pet_public_id)
      raise(RuntimeError, 3007003) unless pet

      pets_id << pet.id
    end

    autoship.pets.destroy_all
    pets_id.each do |id|
      AutoshipPet.create!(autoship_id: autoship.id, pet_id: id)
    end
  end
end
