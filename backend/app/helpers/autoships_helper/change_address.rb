module AutoshipsHelper::ChangeAddress
  def change_address(customer:, public_id:, address_id:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    address = customer.addresses.find_by(public_id: address_id)
    raise(RuntimeError, 3007004) unless address

    autoship.update!(address_id: address.id)
  end
end
