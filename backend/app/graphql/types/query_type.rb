module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    #items
    field :items, [Types::ItemType], null: false do
      argument :page, Int, required: false
      argument :limit, Int, required: false
    end
    def items(page: nil, limit: nil)
      query(Item, page, limit)
    end


    private
    def query(entity, page, limit)
      page = page || 1
      limit = limit || 100

      entity.all.limit(limit).offset((page * limit) - limit)
    end
  end
end