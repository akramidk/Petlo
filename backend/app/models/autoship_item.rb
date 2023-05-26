class AutoshipItem < ApplicationRecord
  belongs_to :autoship

  validates :autoship_id, presence: { message: 1 }
  validates :item_id, presence: { message: 1 }
  validates :variant_id, presence: { message: 1 }
end
