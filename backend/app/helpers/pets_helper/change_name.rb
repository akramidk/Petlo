module PetsHelper::ChangeName
  def change_name(customer:, public_id:, name:)
    pet = customer.pets.find_by(public_id: public_id)

    if pet
      begin
        pet.update(name: name)
      rescue ActiveRecord::RecordInvalid => invalid
        raise(ActiveRecordError.extract(object: invalid))
      end
    else
      raise("pet_not_found")
    end
  end
end  
