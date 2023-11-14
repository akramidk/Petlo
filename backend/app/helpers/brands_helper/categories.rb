module BrandsHelper::Categories
    def categories(country:, language:, public_id:)
        brand = Brand.find_by(public_id: public_id)
        categories = Category.all

        brand_categories = []
        categories.each do |category|
            items = category.items.joins(:availabilities).where(brand_id: brand.id).where(availabilities: {country: country, value: true})
            
            brand_categories << {
                public_id: category.public_id,
                name: category.names.find_by(language: language)&.value
            } if items.length > 0
        end

        brand_categories
    end
end