module Types
  class VariantOptionType < Types::BaseObject
    field :id, Int, null: false
    field :variant_id, Int, null: false
    field :option_id, Int, null: false
    field :option_value_number, Int, null: false
    field :value, String, null: false

    def value
      Option.find_by(id: object.option_id).values.find_by(number: object.option_value_number).value
    end
  end
end