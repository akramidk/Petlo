module Types
  class VariantOptionType < Types::BaseObject
    field :id, Int, null: false
    field :variant_id, Int, null: false
    field :option_id, Int, null: false
    field :option_value_number, Int, null: false
  end
end