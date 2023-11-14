module BrandsHelper::Search
    LIMIT = 8

    def search(country:, language:, value:)
        brands = Brand.joins(
            :names
        ).where(names: {
            language: language != "en" ? [language, "en"] : "en"
        }).where(
            "names.value LIKE ?", "%#{value}%"
        ).limit(LIMIT).uniq

        brands_data = []
        brands.each do |brand|
            name = brand.names.find_by(language: language).value

            brands_data << {
                public_id: brand.public_id,
                name: name,
                logo: brand.logo.url
            }
        end

        brands_data
    end
end