module Item::ShortInformation
  def short_information(country:, language:)
    variants = self.variants.joins(:availabilities).where(availabilities: { country: country })
    number_of_variants = variants.count
    
    variants_prices = variants.map{ |variant| variant.prices.find_by(country: country).value}.sort
    prices = {
      min: variants_prices[0],
      max: variants_prices[number_of_variants - 1]
    }

    {
      public_id: self.public_id,
      name: self.details.find_by(language: language).name,
      brand: self.brand.names.find_by(language: language).value,
      image: self.image.url,
      variants: {
        number: number_of_variants,
        prices: {
          min: prices[:min],
          max: prices[:max],
          currency: CONSTANTS::COUNTRIES_CURRENCIES[country][language]
        }
      }
    }
  end
end
