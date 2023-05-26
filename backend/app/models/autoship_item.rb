class AutoshipItem < ApplicationRecord
  belongs_to :autoship

  validates :autoship_id, presence: { message: 2014000 }
  validates :item_id, presence: { message: 2014001 }
  validates :variant_id, presence: { message: 2014002 }
  validates :quantity, presence: { message: 2015003 }, numericality: { greater_than: 0, message: 2015004 }
end
