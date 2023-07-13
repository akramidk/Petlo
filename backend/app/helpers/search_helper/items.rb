module SearchHelper::Items
  LIMIT = 16
  
  def items(country:, language:, value:)
    search_results = Item.joins(
      :availabilities,
      :details
    ).where(
      availabilities: {
        country: country,
        value: true
      }
    ).where(
      details: {
        language: language != "en" ? [language, "en"] : "en"
      }
    ).where(
      "details.name LIKE ?", "%#{value}%"
    ).limit(LIMIT).uniq

    items = {
      has_more: false, 
      data: search_results.map{|item| item.short_information(country: country, language: language)}
    }
  end
end
