module BrandsHelper::Items
    def items(country:, language:, public_id:, category_public_id: nil, limit:, page:)
        offset = (limit * page) - limit

        brand = Brand.find_by(public_id: public_id)
        items = []

        if category_public_id
            items = brand.items.joins(
                :availabilities,
                :categories
            ).where(
                availabilities: {
                    country: country,
                    value: true
                }
            ).where(
                categories: {
                    public_id: category_public_id
                }
            ).limit(limit + 1).offset(offset)
        else
            items = brand.items.joins(
                :availabilities,
            ).where(
                availabilities: {
                    country: country,
                    value: true
                }
            ).limit(limit + 1).offset(offset)
        end

        {
            has_more: !!items[limit],
            data: items[0..limit-1].map{|item| item.short_information(country: country, language: language)}
        }
    end
end