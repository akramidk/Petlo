class Item < ApplicationRecord
  include PublicIdGenerator

  has_many :names, class_name: "ItemName"
  has_many :availabilities, class_name: "ItemAvailability"

  validates :public_id, presence: true, uniqueness: true
  validates :brand_id, presence: true
end
