module CategoriesHelper::Items
  LIMIT = 100

  def items(category_public_id:, brand_public_id:, country:, language:, page:)
    offset = (LIMIT * page) - LIMIT

    items = Category.items(
      category: category_public_id,
      brand_public_id: brand_public_id,
      country: country,
      language: language,
      limit: (LIMIT),
      offset: (offset)
    )

    { has_more: items[:has_more], data: items[:data] }
  end
end
