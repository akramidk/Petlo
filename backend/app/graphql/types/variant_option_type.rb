module Types
  class VariantOptionType < Types::BaseObject
    field :id, ID, null: false
    field :variant_id, ID, null: false
    field :option_id, ID, null: false
    field :option_value_number, Int, null: false
  end
end