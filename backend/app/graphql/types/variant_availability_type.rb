module Types
    class VariantAvailabilityType < Types::BaseObject
        field :id, Int, null: false
        field :variant_id, String, null: false
        field :country, String, null: false
        field :value, Boolean, null: false
    end
end