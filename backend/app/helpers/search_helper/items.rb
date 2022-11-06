module SearchHelper::Items
  LIMIT = 8
  
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
        language: language
      }
    ).where(
      "details.title LIKE ?", "%#{value}%"
    ).limit(LIMIT)

    items = {
      has_more: false, 
      data: search_results.map{|item| item.short_information(country: country, language: language)}
    }
  end
end
