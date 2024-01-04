module Types
    class RelationType < Types::BaseObject    
      field :id, ID, null: false
      field :item_id, ID, null: false
      field :category_id, ID, null: false
    end
end