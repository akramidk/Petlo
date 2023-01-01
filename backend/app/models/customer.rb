class Customer < ApplicationRecord
  include Verification
  include PublicIdGenerator

  has_many :pets
  has_many :cards

  has_secure_password
  encrypts :phone_number, deterministic: true
  
  enum phone_verification_status: {
    unverified: 0,
    verified: 1
  }, _prefix: :phone
  
  enum verification_code_permission: {
    "#{ENUM::SESSION_TOKEN_PERMISSIONS[:CUSTOMER_VERIFICATION]}": 0,
    "#{ENUM::SESSION_TOKEN_PERMISSIONS[:SESSION_VERIFICATION]}": 1
  }, _prefix: :verification_code_permission

  validates :public_id, presence: { message: 2000000 }, uniqueness: { message: 2000001 }
  validates :name, presence: { message: 2000002 }
  validates :country, presence: { message: 2000003 }, inclusion: { in: CONSTANTS::COUNTRIES, message: 2000004 }
  validates :phone_number, presence: { message: 2000005 }, uniqueness: { message: 2000006 }
  validates :password, presence: { message: 2000007 }, length: { minimum: 8, message: 2000008 }, on: :create
end
