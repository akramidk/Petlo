module SectionsHelper::All
  DEFAULT_LIMIT = 8
  
  SECTIONS = [
    {
      name: {
        "ar" => "طعام كلاب",
        "en" => "Dog Food"
      },
      category_public_id: "rsyrJHUiDdZmAoFU"
    },
    {
      name: {
        "ar" => "طعام قطط",
        "en" => "Cat Food"
      },
      category_public_id: "cats-food"
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
          limit: (limit || DEFAULT_LIMIT)
        )

        next if items[:data].length == 0
        sections << {
          name: section[:name][language],
          category: section[:category_public_id],
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
