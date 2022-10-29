class ItemDetail < ApplicationRecord
  belongs_to :item

  validates :item_id, presence: true, uniqueness: { scope: :language }
  validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
  validates :title, presence: true
end
