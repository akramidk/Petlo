class VariantOption < ApplicationRecord
  has_many :values, class_name: "OptionValue", foreign_key: [:option_id, :option_number]
  
  belongs_to :variant

  validates :variant_id, presence: true, uniqueness: { scope: [:option_id, :option_number] }
  validates :option_id, presence: true
  validates :option_number, presence: true
end
