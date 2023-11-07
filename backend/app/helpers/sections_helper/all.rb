module SectionsHelper::All
  DEFAULT_LIMIT = 4
  
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
        "ar" => "رويال كانين طعام جاف للكلاب",
        "en" => "Royal Canin Dry Dog Food"
      },
      category_public_id: "OCqWuzle8HRKChzL",
      brand_public_id: "f6jYP3jTW8YBYhLo"
    },
    {
      name: {
        "ar" => "رويال كانين طعام رطب للكلاب",
        "en" => "Royal Canin Wet Dog Food"
      },
      category_public_id: "HHUdNHbdKCuhJIN2",
      brand_public_id: "f6jYP3jTW8YBYhLo"
    },
    {
      name: {
        "ar" => "نيتشر بروتكشن طعام جاف للقطط",
        "en" => "Nature's Protection Dry Cat Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "jTgSswhfAGnTDWnT"
    },
    {
      name: {
        "ar" => "نيتشر بروتكشن طعام رطب للقطط",
        "en" => "Nature's Protection Wet Cat Food"
      },
      category_public_id: "98DFFK9P0Y7o0uoZ",
      brand_public_id: "jTgSswhfAGnTDWnT"
    },
    {
      name: {
        "ar" => "نيتشر بروتكشن طعام جاف للكلاب",
        "en" => "Nature's Protection Dry Dog Food"
      },
      category_public_id: "OCqWuzle8HRKChzL",
      brand_public_id: "jTgSswhfAGnTDWnT"
    },
    {
      name: {
        "ar" => "فيليسيا طعام جاف للقطط",
        "en" => "Felicia Dry Cat Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "WkwvH3KPMlsCTjqG"
    },
    {
      name: {
        "ar" => "فيليسيا طعام رطب للقطط",
        "en" => "Felicia Wet Cat Food"
      },
      category_public_id: "98DFFK9P0Y7o0uoZ",
      brand_public_id: "WkwvH3KPMlsCTjqG"
    },
    {
      name: {
        "ar" => "فيليسيا طعام جاف للكلاب",
        "en" => "Felicia Dry Dog Food"
      },
      category_public_id: "OCqWuzle8HRKChzL",
      brand_public_id: "WkwvH3KPMlsCTjqG"
    },
    {
      name: {
        "ar" => "المزيد من الطعام الجاف للكلاب",
        "en" => "More Dry Dog Food"
      },
      category_public_id: "OCqWuzle8HRKChzL",
      brand_public_id: ["Z1ikn0wfAw0vqN4h", "xck5wT1zNH3gjMUC", "Gk79Bwd3dTH6kOoj"]
    },
    {
      name: {
        "ar" => "مولي طعام جاف للقطط",
        "en" => "Molly Dry Cat Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "7fzwzmgVPOHlBAdn"
    },
    {
      name: {
        "ar" => "ريفلكس طعام جاف للقطط",
        "en" => "Reflex Dry Cat Food"
      },
      category_public_id: "jsKVEGhNf9sCOoHv",
      brand_public_id: "Q002zrwi0U2aCNkI"
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
        "ar" => "مكمل الحليب للكلاب",
        "en" => "Milk Supplement for Dogs"
      },
      category_public_id: "C1oGvzcmENuIMkur"
    },
    {
      name: {
        "ar" => "رمل لفضلات القطط",
        "en" => "Cat Litters"
      },
      category_public_id: "flzjBzerYYdaO8Dx"
    },
    {
      name: {
        "ar" => "مكافات للقطط",
        "en" => "Cat Treats"
      },
      category_public_id: "vLUgz0YK8rxiXwSa"
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
          brands: section[:brand_public_id],
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
