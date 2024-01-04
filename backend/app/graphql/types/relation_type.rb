module Types
    class RelationType < Types::BaseObject    
      field :id, Int, null: false
      field :item_id, String, null: false
      field :category_id, String, null: false
    end
end