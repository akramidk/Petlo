module AutoshipsHelper::UpdateDate
  def update_date(customer:, public_id:, recurring_interval:, recurring_interval_count:, next_shipment_on:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    splitted_next_shipment_on = next_shipment_on.split("-")
    next_shipment_on = Date.new(
      splitted_next_shipment_on[0].to_i,
      splitted_next_shipment_on[1].to_i,
      splitted_next_shipment_on[2].to_i
    )
    raise(RuntimeError, 3007005) unless next_shipment_on > Utils.utc_to_local_time(country: customer.country)

    autoship.update!(
      recurring_interval: recurring_interval,
      recurring_interval_count: recurring_interval_count,
      next_shipment_on: next_shipment_on
    )
  end
end
