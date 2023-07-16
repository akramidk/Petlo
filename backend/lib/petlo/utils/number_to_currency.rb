module Utils
    def self.number_to_currency(country:, number:)
        return nil unless number
        
        currency_number_of_decimal = CONSTANTS::COUNTRIES_CURRENCY_NUMBER_OF_DECIMALS[country]
        divide_number_by = BigDecimal(10) ** BigDecimal(currency_number_of_decimal)

        amount = BigDecimal(number) / BigDecimal(divide_number_by)

        ActionController::Base.helpers.number_with_precision(amount, precision: 2)
    end
end