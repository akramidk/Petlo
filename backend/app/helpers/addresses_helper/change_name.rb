module AddressesHelper::ChangeName
    def change_name(customer:, public_id:, name:)
      address = customer.addresses.find_by(public_id: public_id)
      raise(RuntimeError, 3004000) if !address

      address.update!(name: name)
    end
end