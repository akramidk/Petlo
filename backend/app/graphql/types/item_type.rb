module Types
  class ItemType < Types::BaseObject
    field :public_id, ID, null: false
    field :brand_id, String, null: false
    field :details, [Types::ItemDetailType]
    field :availabilities, [Types::ItemAvailabilityType]
    field :options, [Types::OptionType]
  end
end