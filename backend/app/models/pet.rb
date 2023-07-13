class Pet < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :image
  
  belongs_to :customer

  validates :public_id, presence: { message: 2001000 }, uniqueness: { message: 2001001 }
  validates :customer_id, presence: { message: 2001002 }
  validates :name, presence: { message: 2001003 }, uniqueness: { scope: [:kind, :breed, :gender], message: 2001004 }
  validates :kind, presence: { message: 2001005 }, inclusion: { in: CONSTANTS::PETS.keys, message: 2001006 }
  #TODO should be without transform_keys
  validates :breed, presence: { message: 2001007 }, inclusion: { in: CONSTANTS::PETS["dog"][:breeds].transform_keys(&:to_s).keys, message: 2001008 }, if: -> { kind == "dog" }
  validates :breed, presence: { message: 2001007 }, inclusion: { in: CONSTANTS::PETS["cat"][:breeds].transform_keys(&:to_s).keys, message: 2001008 }, if: -> { kind == "cat" }
  validates :gender, presence: { message: 2001009 }, inclusion: { in: CONSTANTS::PET_GENDERS.keys, message: 2001010 }
end
