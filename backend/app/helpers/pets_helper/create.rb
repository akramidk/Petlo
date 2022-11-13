module PetsHelper::Create
  def create(customer:, name:, kind:, breed:, gender:)
    begin
      Pet.create!(
        customer_id: customer.id,
        name: name,
        kind: kind,
        breed: breed,
        gender: gender
      )
    rescue ActiveRecord::RecordInvalid => invalid
      raise(ActiveRecordError.extract(object: invalid))
    end
  end
end
