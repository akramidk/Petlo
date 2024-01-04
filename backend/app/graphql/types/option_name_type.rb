module Types
    class OptionNameType < Types::BaseObject
      field :id, ID, null: false
      field :option_id, ID, null: false
      field :language, String, null: false
      field :value, String, null: false
    end
end