module AutoshipsHelper::ChangeName
  def change_name(customer:, public_id:, name:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    autoship.update!(name: name)
  end
end
