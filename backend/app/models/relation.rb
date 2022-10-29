class Relation < ApplicationRecord
  belongs_to :item
  belongs_to :category

  validates :item_id, presence: true, uniqueness: { scope: :category_id }
  validates :category_id, presence: true
end
