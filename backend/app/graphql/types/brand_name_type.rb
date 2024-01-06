module Types
    class BrandNameType < Types::BaseObject
      field :brand_id, Int, null: false
      field :language, String, null: false
      field :value, String, null: true
    end
end