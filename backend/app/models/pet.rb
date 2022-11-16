class Pet < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :image
  
  belongs_to :customer

  enum gender: {
    "male": 0,
    "female": 1
  }

  validates :public_id, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :name, presence: true, uniqueness: true
  validates :kind, presence: true, inclusion: { in: CONSTANTS::PETS.keys }
end
