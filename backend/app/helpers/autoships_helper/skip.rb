module AutoshipsHelper::Skip
  def skip(customer:, public_id:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    next_shipment_on_after_the_skip =  Utils.autoship_date_after_the_skip(
      next_shipment_on: autoship.next_shipment_on,
      recurring_interval: autoship.recurring_interval,
      recurring_interval_count: autoship.recurring_interval_count
    )

    autoship.update!(next_shipment_on: next_shipment_on_after_the_skip)
  end
end
