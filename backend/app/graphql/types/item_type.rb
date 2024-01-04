module Types
  class ItemType < Types::BaseObject
    field :public_id, String, null: false
    field :brand_id, String, null: false
    field :details, [Types::ItemDetailType], null: false
    field :availabilities, [Types::ItemAvailabilityType], null: false
    field :options, [Types::OptionType], null: false
    field :variants, [Types::VariantType], null: false
    field :relations, [Types::RelationType], null: false
  end
end