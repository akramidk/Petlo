module Types
    class OptionType < Types::BaseObject
      field :public_id, ID, null: false
      field :item_id, ID, null: false
      field :weighted, Boolean, null: false
      field :names, [Types::OptionNameType], null: false
      field :values, [Types::OptionValueType], null: false
    end
end