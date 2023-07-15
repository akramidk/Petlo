module Utils
  def self.autoship_date_after_the_skip(next_shipment_on:, recurring_interval:, recurring_interval_count:)
    date = next_shipment_on

    if recurring_interval === "day"
      date += recurring_interval_count.day
    else
      date += recurring_interval_count.month
    end

    date
  end
end