module Utils
  USD_TO_JOD = 141
  NUMBER_TO_USD = 100

  def self.number_to_usd(country:, number:, as_string: false)
    currency_number_of_decimal = CONSTANTS::COUNTRIES_CURRENCY_NUMBER_OF_DECIMALS[country]
    divide_number_by = BigDecimal(10) ** BigDecimal(currency_number_of_decimal)
    the_real_number = BigDecimal(number) / BigDecimal(divide_number_by)

    #TODO should handle other countries instead of usd to jod
    usd_number = (BigDecimal(the_real_number) * BigDecimal(USD_TO_JOD)).to_i

    if as_string
      usd_amount = BigDecimal(usd_number) / BigDecimal(NUMBER_TO_USD)
      ActionController::Base.helpers.number_with_precision(usd_amount, precision: 2)
    else
      usd_number
    end
  end
end