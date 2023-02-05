class VariantPrice < ApplicationRecord
  belongs_to :variant

  validates :variant_id, presence: true, uniqueness: { scope: :country }
  validates :country, presence: true, inclusion: { in: CONSTANTS::COUNTRIES.keys }
  validates :value, presence: true
end
