class Item < ApplicationRecord
  include PublicIdGenerator

  has_many :details, class_name: "ItemDetail"
  has_many :availabilities, class_name: "ItemAvailability"

  has_many :options
  has_many :variants

  has_many :relations 
  has_many :categories, through: :relations

  validates :public_id, presence: true, uniqueness: true
  validates :brand_id, presence: true
end
