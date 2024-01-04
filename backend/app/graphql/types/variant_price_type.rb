module Types
    class VariantPriceType < Types::BaseObject
      field :id, ID, null: false
      field :variant_id, ID, null: false
      field :country, String, null: false
      field :value, String, null: false
    end
end