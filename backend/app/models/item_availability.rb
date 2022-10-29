class ItemAvailability < ApplicationRecord
  belongs_to :item

  validates :item_id, presence: true, uniqueness: { scope: :country  }
  validates :country, presence: true, inclusion: { in: CONSTANTS::COUNTRIES }
  validates :value, inclusion: [true, false]
end
