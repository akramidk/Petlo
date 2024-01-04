module Types
    class OptionValueType < Types::BaseObject
      field :id, Int, null: false
      field :option_id, Int, null: false
      field :language, String, null: false
      field :value, String, null: false
    end
end