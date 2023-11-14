module BrandsHelper::Index
    def index(country:, language:, featured:, limit:, page:)
        offset = (limit * page) - limit

        brands = []

        if featured
            brands = Brand.joins(
                :settings
            ).where(settings: {
                country: country,
                featured: true
            }).limit(limit + 1).offset(offset)
        else
            brands = Brand.limit(limit + 1).offset(offset)
        end

        brands_data = []
        brands.each do |brand|
            name = brand.names.find_by(language: language).value

            brands_data << {
                public_id: brand.public_id,
                name: name,
                logo: brand.logo.url
            }
        end

        { has_more: !!brands_data[limit], data: brands_data[0..limit-1] }
    end
end