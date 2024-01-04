module Types
    class VariantPriceType < Types::BaseObject
      field :id, Int, null: false
      field :variant_id, Int, null: false
      field :country, String, null: false
      field :value, String, null: false
    end
end