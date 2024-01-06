module Types
    class CategoryType < Types::BaseObject
      field :id, Int, null: false
      field :public_id, String, null: false
      field :name, String, null: false
      field :parent_id, Int, null: true
      field :names, [Types::CategoryNameType], null: false
    end
end