module Types
    class ItemDetailType < Types::BaseObject
        field :id, ID, null: false
        field :item_id, ID, null: false
        field :name, String, null: false
    end
end