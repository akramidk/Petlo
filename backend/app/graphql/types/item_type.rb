module Types
  class ItemType < Types::BaseObject
    field :public_id, String, null: false
    field :brand_id, Int, null: false
    field :brand, BrandType, null: false
    field :details, [Types::ItemDetailType], null: false
    field :availabilities, [Types::ItemAvailabilityType], null: false
    field :options, [Types::OptionType], null: false
    field :variants, [Types::VariantType], null: false
    field :relations, [Types::RelationType], null: false

    def brand
      brand = Brand.find(object.brand_id)
    end
  end
end