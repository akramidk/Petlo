module Types
  class QueryType < Types::BaseObject
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    #items
    field :items, [Types::ItemType], null: false do
      argument :page, Int, required: false
      argument :limit, Int, required: false
      argument :order, String, required: false
    end
    def items(page: nil, limit: nil, order: nil)
      query(Item, page, limit, order)
    end


    private
    def query(entity, page, limit, order)
      page = page || 1
      limit = limit || 100
      order = order || "asc"

      entity.all.order(id: order).limit(limit).offset((page * limit) - limit)
    end
  end
end