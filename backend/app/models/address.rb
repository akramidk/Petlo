class Address < ApplicationRecord
  include PublicIdGenerator

  belongs_to :customer

  encrypts :latitude, deterministic: true
  encrypts :longitude, deterministic: true
  encrypts :details

  validates :public_id, presence: { message: 2003000 }, uniqueness: { message: 2003001 }
  validates :customer_id, presence: { message: 2003002 }, uniqueness: { scope: [:longitude, :latitude], message: 2003003 }
  validates :name, presence: { message: 2003004 }, uniqueness: { scope: :customer_id, message: 2003005 }
  validates :latitude, presence: { message: 2003007 }
  validates :longitude, presence: { message: 2003006 }
end
