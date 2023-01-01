module PetsHelper::ChangeImage
  def change_image(customer:, public_id:, image:)
    pet = customer.pets.find_by(public_id: public_id)

    if pet
      pet.image.attach!(image)
    else
      raise(RuntimeError, 3001000)
    end
  end
end  
