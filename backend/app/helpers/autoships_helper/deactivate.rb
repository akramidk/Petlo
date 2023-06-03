module AutoshipsHelper::Deactivate
  def deactivate(customer:, public_id:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    autoship.update!(
      status: "deactivated",
      next_shipment_on: nil
    )
  end
end