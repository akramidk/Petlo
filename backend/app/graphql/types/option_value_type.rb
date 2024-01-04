module Types
    class OptionValueType < Types::BaseObject
      field :id, ID, null: false
      field :option_id, ID, null: false
      field :language, String, null: false
      field :value, String, null: false
    end
end