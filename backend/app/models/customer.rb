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

  validates :public_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :country, presence: true, inclusion: { in: CONSTANTS::COUNTRIES }
  validates :phone_number, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }, on: :create
end
