module Types
    class BrandType < Types::BaseObject
      field :public_id, ID, null: false
      field :names, [BrandNameType], null: false
    end
end