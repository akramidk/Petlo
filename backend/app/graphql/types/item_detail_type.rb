module Types
    class ItemDetailType < Types::BaseObject
        field :id, Int, null: false
        field :item_id, Int, null: false
        field :name, String, null: false
        field :language, String, null: false
    end
end