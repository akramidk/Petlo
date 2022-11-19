module PetsHelper::Create
  def create(customer:, name:, kind:, breed:, gender:, image:)
    begin
      pet = Pet.create!(
        customer_id: customer.id,
        name: name,
        kind: kind,
        breed: breed,
        gender: gender
      )
      pet.image.attach(image)
    rescue ActiveRecord::RecordInvalid => invalid
      raise(ActiveRecordError.extract(object: invalid))
    end
  end
end
