class Pet < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :image
  
  belongs_to :customer

  validates :public_id, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :name, presence: true, uniqueness: true
  validates :kind, presence: true, inclusion: { in: CONSTANTS::PETS.keys }
  validates :gender, presence: true, inclusion: { in: CONSTANTS::PET_TYPES.keys }
  validates :image, size: { less_than: 100.megabytes }, content_type: [:png, :jpg, :jpeg, :heic]
end
