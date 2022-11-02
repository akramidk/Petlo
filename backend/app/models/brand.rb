class Brand < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :logo
  has_many :names, class_name: "BrandName"
  
  validates :public_id, presence: true, uniqueness: true
end
