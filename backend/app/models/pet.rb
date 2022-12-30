class Pet < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :image
  
  belongs_to :customer

  validates :public_id, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :name, presence: true, uniqueness: { scope: [:kind, :breed, :gender] }
  validates :kind, presence: true, inclusion: { in: CONSTANTS::PETS.keys }
  validates :breed, presence: true, inclusion: { in: CONSTANTS::PETS["dog"][:breeds].keys }, if: -> { kind == "dog" }
  validates :breed, presence: true, inclusion: { in: CONSTANTS::PETS["cat"][:breeds].keys }, if: -> { kind == "cat" }
  validates :gender, presence: true, inclusion: { in: CONSTANTS::PET_GENDERS.keys }
end
