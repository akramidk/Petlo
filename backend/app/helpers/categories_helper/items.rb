module CategoriesHelper::Items
  LIMIT = 16

  def items(category:, country:, language:, page:)
    offset = (LIMIT * page) - LIMIT

    items = Category.items(
      category: category,
      country: country,
      language: language,
      limit: (LIMIT),
      offset: (offset)
    )

    { has_more: items[:has_more], data: items[:data] }
  end
end
