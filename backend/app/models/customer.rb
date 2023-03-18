class Customer < ApplicationRecord
  include Verification
  include PublicIdGenerator
  extend ValidatesPassword

  has_many :pets
  has_many :cards
  has_many :addresses
  has_many :carts
  has_many :checkouts

  has_secure_password
  encrypts :phone_number, deterministic: true
  encrypts :verification_code
  
  enum phone_verification_status: {
    unverified: 0,
    verified: 1
  }, _prefix: :phone
  
  enum verification_code_permission: {
    "#{ENUM::PERMISSIONS[:CUSTOMER_VERIFICATION]}": 0,
    "#{ENUM::PERMISSIONS[:SESSION_VERIFICATION]}": 1,
    "#{ENUM::PERMISSIONS[:DELETE_CUSTOMER]}": 2,
    "#{ENUM::PERMISSIONS[:VERIFY_RESET_PASSWORD_REQUEST]}": 3,
    "#{ENUM::PERMISSIONS[:CHANGE_CUSTOMER_PASSWORD]}": 4
  }, _prefix: :verification_code_permission

  validates :public_id, presence: { message: 2000000 }, uniqueness: { message: 2000001 }
  validates :name, presence: { message: 2000002 }
  validates :country, presence: { message: 2000003 }, inclusion: { in: CONSTANTS::COUNTRIES.keys, message: 2000004 }
  validates :phone_number, presence: { message: 2000005 }, uniqueness: { message: 2000006 }
end