module Types
    class CategoryNameType < Types::BaseObject
      field :category_id, Int, null: false
      field :language, String, null: false
      field :value, String, null: true
    end
end