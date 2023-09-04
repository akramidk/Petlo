module SectionsHelper::All
  DEFAULT_LIMIT = 8
  
  SECTIONS = [
    {
      name: {
        "ar" => "رويال كانين طعام جاف للقطط",
        "en" => "Royal Canin Cat Dry Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "f6jYP3jTW8YBYhLo"
    }
  ]
  
  def all(customer:, language:, limit:)
    sections = []
  
    begin
      SECTIONS.each do |section|
        items = Category.items(
          category: section[:category_public_id],
          country: customer.country,
          language: language,
          limit: (limit || DEFAULT_LIMIT),
          brand_public_id: section[:brand_public_id],
        )

        next if items[:data].length == 0
        sections << {
          name: section[:name][language],
          category: section[:category_public_id],
          brand_public_id: section[:brand_public_id],
          items: {
            has_more: items[:has_more],
            data: items[:data]
          }
        }
      end

      { data: sections }
    end  
  end
end
