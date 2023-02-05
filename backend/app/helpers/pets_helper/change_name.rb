module PetsHelper::ChangeName
  def change_name(customer:, public_id:, name:)
    pet = customer.pets.find_by(public_id: public_id)
    raise(RuntimeError, 3001000) if !pet

    pet.update!(name: name)
  end
end  
