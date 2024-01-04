module Types
  class QueryType < Types::BaseObject
    require 'json'

    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    #items
    field :items, [Types::ItemType], null: false do
      argument :page, Int, required: false
      argument :limit, Int, required: false
      argument :filter, GraphQL::Types::JSON, required: false
      argument :order, String, required: false
    end
    def items(page: nil, limit: nil, filter: nil, order: nil)
      query(Item, page, limit, filter, order)
    end

    private
    def query(entity, page, limit, filter, order)
      page = page || 1
      limit = limit || 100
      order = order || "asc"
      filter = filter || ""

      entity.joins(:details).where(filter).order(id: order).limit(limit).offset((page * limit) - limit).distinct
    end
  end
end