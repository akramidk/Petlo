module Item::LongInformation
  def long_information(country:, language:)
    available = self.availabilities.find_by(country: country).value

    options = self.options.map{ |option|
      {
        public_id: option.public_id,
        name: option.names.find_by(language: language).value,
        values: option.values.where(language: language).map{|option_value|
          option_value.value + " " + option_value.unit
        }
      }
    }

    variants = self.variants.joins(:availabilities).where(availabilities: { country: country }).map{ |variant|
      {
        public_id: variant.public_id,
        available: variant.availabilities.find_by(country: country).value,
        options: variant.options.map{|option|
          {
            public_id: option.retrieve.public_id,
            name: option.names.find_by(language: language).value,
            value: option.values.find_by(language: language).value
          }
        },
        price: Utils.number_to_currency(
          country: country,
          number: variant.prices.find_by(country: country).value
        )
      }
    }


    {
      public_id: self.public_id,
      name: self.details.find_by(language: language).name,
      available: available,
      brand: self.brand.names.find_by(language: language).value,
      image: self.image.url,
      options: options,
      variants: variants,
      currency: CONSTANTS::COUNTRIES_CURRENCIES[country][language]
    }
  end
end
