class VariantAvailability < ApplicationRecord
  belongs_to :variant

  validates :variant_id, presence: true, uniqueness: { scope: :country }
  validates :country, presence: true, inclusion: { in: CONSTANTS::COUNTRIES.keys }
  validates :value, inclusion: [true, false]
end
