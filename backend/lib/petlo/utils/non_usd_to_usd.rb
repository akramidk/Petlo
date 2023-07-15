module Utils
  def self.non_usd_to_usd(country:, number:)
    non_usd = Utils.number_to_currency(country: country, number: number).to_i
    #TODO should handle other countries
    (non_usd * 1.41 * 100).to_i
  end
end