module PetsHelper::ChangeImage
  def change_image(customer:, public_id:, image:)
    pet = customer.pets.find_by(public_id: public_id)

    if pet
      begin
        pet.image.attach(image)
      rescue ActiveRecord::RecordInvalid => invalid
        raise(ActiveRecordError.extract(object: invalid))
      end
    else
      raise("pet_not_found")
    end
  end
end  
