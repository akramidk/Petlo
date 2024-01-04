module Types
  class ItemType < Types::BaseObject
    field :id, ID, null: false
    field :public_id, String, null: false
    field :details, [Types::ItemDetailType]
  end
end