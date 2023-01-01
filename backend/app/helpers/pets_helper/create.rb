module PetsHelper::Create
  def create(customer:, name:, kind:, breed:, gender:, image:)
    pet = Pet.create!(
      customer_id: customer.id,
      name: name,
      kind: kind,
      breed: breed,
      gender: gender
    )
    pet.image.attach(image)
  end
end
