module Types
    class RelationType < Types::BaseObject    
      field :id, Int, null: false
      field :item_id, Int, null: false
      field :category_id, Int, null: false
    end
end