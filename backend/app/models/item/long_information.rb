module Item::LongInformation
  def long_information(country:, language:)
    available = self.availabilities.find_by(country: country).value

    options = self.options.map{ |option|
      {
        name: option.names.find_by(language: language).value,
        values: option.values.where(language: language).map{|option_value|
          option_value.value
        },
        unit: option.weighted ? CONSTANTS::OPTION_UNITS[option.unit][language] : nil
      }
    }

    variants = self.variants.joins(:availabilities).where(availabilities: { country: country }).map{ |variant|
      {
        public_id: variant.public_id,
        available: variant.availabilities.find_by(country: country).value,
        options: variant.options.map{|option|
          {
            name: option.names.find_by(language: language).value,
            value: option.values.find_by(language: language).value
          }
        },
        price: variant.prices.find_by(country: country).value
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
