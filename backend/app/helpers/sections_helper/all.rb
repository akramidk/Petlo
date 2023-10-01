module SectionsHelper::All
  DEFAULT_LIMIT = 8
  
  SECTIONS = [
    {
      name: {
        "ar" => "رويال كانين طعام جاف للقطط",
        "en" => "Royal Canin Dry Cat Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "f6jYP3jTW8YBYhLo"
    },
    {
      name: {
        "ar" => "رويال كانين طعام رطب للقطط",
        "en" => "Royal Canin Wet Cat Food"
      },
      category_public_id: "98DFFK9P0Y7o0uoZ",
      brand_public_id: "f6jYP3jTW8YBYhLo"
    },
    {
      name: {
        "ar" => "مكمل الحليب للقطط",
        "en" => "Milk Supplement for Cats"
      },
      category_public_id: "6Xm9NXKuNoNAdcBH"
    },
    {
      name: {
        "ar" => "رمل لفضلات القطط",
        "en" => "Cat Litters"
      },
      category_public_id: "flzjBzerYYdaO8Dx"
    }
  ]
  
  def all(country:, language:, limit:)
    sections = []
  
    begin
      SECTIONS.each do |section|
        items = Category.items(
          category: section[:category_public_id],
          country: country,
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
