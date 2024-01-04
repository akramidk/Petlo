module Types
    class ItemAvailabilityType < Types::BaseObject
        field :id, Int, null: false
        field :item_id, Int, null: false
        field :country, String, null: false
        field :value, Boolean, null: false
    end
end