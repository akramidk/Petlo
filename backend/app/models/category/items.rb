module Category::Items
  @@category = nil
  @@subcategory = nil
  @@country = nil
  @@language = nil
  @@with_unavailable_items = nil
  @@limit = nil
  @@offset = nil

  def items(category:, country:, language:, with_unavailable_items: false, limit: nil, offset: nil)
    @@category = category
    @@country = country
    @@language = language
    @@with_unavailable_items = with_unavailable_items
    @@limit = limit
    @@offset = offset
    @@subcategory = get_subcategory

    items = {
      has_more: @@limit || @@offset ? retrieve_items(limit: 1, offset: @@offset.to_i + @@limit.to_i).exists? : false,
      data: retrieve_items(limit: @@limit, offset: @@offset).map{ |item| item.short_information(
        country: country,
        language: language
      )}
    }
  end

  private
  def get_subcategory
    subcategory = nil

    @@category.split("-").each do |name|
      params = subcategory.nil? ? { name: name } : { name: name, parent_id: subcategory.id }
      subcategory = Category.find_by(params)
      
      raise(RuntimeError, 2003000) unless subcategory
    end

    subcategory
  end

  def retrieve_items(limit: nil, offset: nil)
    @@subcategory.items.joins(:availabilities).where(
      availabilities: {
        country: @@country,
        value: @@with_unavailable_items ? [true, false] : true
      }
    ).limit(limit).offset(offset)
  end
end
