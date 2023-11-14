module CategoriesHelper::Index  
  def index(country:, language:)  
    categories = []
    Category.all.each do |category|
      items = category.parent_id && category.items.joins(:availabilities).where(availabilities: {country: country, value: true})
        
      categories << {
        public_id: category.public_id,
        parent_public_id: category.parent_id ? Category.find_by(id: category.parent_id).public_id : nil,
        name: category.names.find_by(language: language)&.value,
        image: category.image.url,
      } if category.parent_id == nil || items.length > 0
    end

    categories
  end
end