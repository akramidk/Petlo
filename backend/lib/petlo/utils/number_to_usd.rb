module Utils
  USD_TO_JOD_WITHOUT_DECIMALS = 141

  def self.number_to_usd(country:, number:, with_precision: false)
    currency_number_of_decimal = CONSTANTS::COUNTRIES_CURRENCY_NUMBER_OF_DECIMALS[country]
    divide_number_by = BigDecimal(10) ** BigDecimal(currency_number_of_decimal)
    the_real_number = BigDecimal(number) / BigDecimal(divide_number_by)

    #TODO should handle other countries instead of usd to jod
    usd_amount = BigDecimal(the_real_number) * BigDecimal(USD_TO_JOD_WITHOUT_DECIMALS)
    usd_amount.to_i

    if with_precision
      ActionController::Base.helpers.number_with_precision(usd_amount, precision: 2)
    end
  end
end