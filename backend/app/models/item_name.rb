class ItemName < ApplicationRecord
  belongs_to :item

  validates :item_id, presence: true, uniqueness: { scope: :language  }
  validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
  validates :value, presence: true
end
