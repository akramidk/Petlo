module Types
    class VariantType < Types::BaseObject
      field :public_id, ID, null: false
      field :item_id, ID, null: false
      field :options, [Types::VariantOptionType], null: false
      field :availabilities, [Types::VariantAvailabilityType], null: false
      field :prices, [Types::VariantPriceType], null: false
    end
end