class Item < ApplicationRecord
  include PublicIdGenerator
  include ShortInformation
  include LongInformation

  has_one_attached :image

  has_many :details, class_name: "ItemDetail"
  has_many :availabilities, class_name: "ItemAvailability"

  has_many :options
  has_many :variants

  has_many :relations 
  has_many :categories, through: :relations

  belongs_to :brand

  validates :public_id, presence: true, uniqueness: true
  validates :brand_id, presence: true
end