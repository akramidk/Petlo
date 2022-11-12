class VariantOption < ApplicationRecord  
  include OptionMethods

  belongs_to :variant

  validates :variant_id, presence: true, uniqueness: { scope: [:option_id, :option_value_number] }
  validates :option_id, presence: true
  validates :option_value_number, presence: true
end
