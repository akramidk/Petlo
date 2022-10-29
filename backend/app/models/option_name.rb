class OptionName < ApplicationRecord
  belongs_to :option

  validates :option_id, presence: true, uniqueness: { scope: :language  }
  validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
  validates :value, presence: true
end
