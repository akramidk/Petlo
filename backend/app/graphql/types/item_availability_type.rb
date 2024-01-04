module Types
    class ItemAvailabilityType < Types::BaseObject
        field :id, ID, null: false
        field :item_id, ID, null: false
        field :country, String, null: false
        field :value, Boolean, null: false
    end
end