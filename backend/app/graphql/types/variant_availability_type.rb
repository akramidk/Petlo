module Types
    class VariantAvailabilityType < Types::BaseObject
        field :id, ID, null: false
        field :variant_id, ID, null: false
        field :country, String, null: false
        field :value, Boolean, null: false
    end
end