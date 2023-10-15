module Category::Items
  @@category = nil
  @@country = nil
  @@language = nil
  @@with_unavailable_items = nil
  @@limit = nil
  @@offset = nil
  @@brands = nil

  def items(category:, country:, language:, with_unavailable_items: false, limit: nil, offset: nil, brands: nil)
    @@category = Category.find_by(public_id: category)

    if !@@category
      return {
        has_more: false,
        data: []
      }
    end

    @@country = country
    @@language = language
    @@with_unavailable_items = with_unavailable_items
    @@limit = limit
    @@offset = offset
    @@brands = brands

    items = {
      has_more: @@limit || @@offset ? retrieve_items(limit: 1, offset: @@offset.to_i + @@limit.to_i).exists? : false,
      data: retrieve_items(limit: @@limit, offset: @@offset).map{ |item| item.short_information(
        country: country,
        language: language
      )}
    }
  end

  private
  def retrieve_items(limit: nil, offset: nil)
    if @@brands
      @@category.items.joins(:availabilities, :brand).where(
        availabilities: {
          country: @@country,
          value: @@with_unavailable_items ? [true, false] : true
        }
      ).where(
        brand: {
          public_id: @@brands
        }
      ).limit(limit).offset(offset)
    else
      @@category.items.joins(:availabilities).where(
        availabilities: {
          country: @@country,
          value: @@with_unavailable_items ? [true, false] : true
        }
      ).limit(limit).offset(offset)
    end
  end
end
