module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    #items
    field :items, [Types::ItemType], null: false do
      argument :limit, Int, required: true
      argument :offset, Int, required: true
    end
    def items(limit:, offset:)
      Item.all.limit(limit).offset(offset)
    end
  end
end