module Types
    class ItemDetailType < Types::BaseObject
        field :id, Int, null: false
        field :item_id, String, null: false
        field :name, String, null: false
        field :language, String, null: false
    end
end