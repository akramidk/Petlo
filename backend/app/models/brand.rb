class Brand < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :logo

  has_many :items
  has_many :names, class_name: "BrandName"
  has_many :settings, class_name: "BrandCountrySetting"
  
  validates :public_id, presence: true, uniqueness: true
end
