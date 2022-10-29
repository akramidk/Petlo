class OptionValue < ApplicationRecord
  belongs_to :option

  validates :option_id, presence: true, uniqueness: { scope: [:number, :language] }
  validates :number, presence: true
  validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
  validates :value, presence: true
end
