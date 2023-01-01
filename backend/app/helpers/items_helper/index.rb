module ItemsHelper::Index
  def index(public_id:, country:, language:)
    item = Item.find_by(public_id: public_id)

    raise(RuntimeError, 3000000) if !item
    item.long_information(country: country, language: language)
  end
end