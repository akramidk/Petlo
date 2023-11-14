module CategoriesHelper::Items
  DEFAULT_LIMIT = 100

  def items(category_public_id:, brand_public_id:, country:, language:, limit:, page:)
    actual_limit = limit == 0 ? DEFAULT_LIMIT : limit
    offset = (actual_limit * page) - actual_limit

    category = Category.find_by(public_id: category_public_id)
    categories = category.parent_id ? [category.public_id] : Category.where(parent_id: category.id).map{|category| category.public_id}

    items = Category.items(
      category: categories,
      brands: brand_public_id ? brand_public_id.split(",") : nil,
      country: country,
      language: language,
      limit: (actual_limit),
      offset: (offset)
    )

    { has_more: items[:has_more], data: items[:data] }
  end
end
