module SectionsHelper::All
  DEFAULT_LIMIT = 8
  
  SECTIONS = [
    {
      name: {
        "ar" => "طعام كلاب",
        "en" => "Dog Food"
      },
      category: "dogs-food"
    },
    {
      name: {
        "ar" => "طعام قطط",
        "en" => "Cat Food"
      },
      category: "cats-food"
    }
  ]
  
  def all(customer:, language:, limit:)
    sections = []
  
    begin
      SECTIONS.each do |section|
        items = Category.items(
          category: section[:category],
          country: customer.country,
          language: language,
          limit: (limit || DEFAULT_LIMIT)
        )

        next if items[:data].length == 0
        sections << {
          name: section[:name][language],
          category: section[:category],
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
