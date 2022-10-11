class Customer < ApplicationRecord
  include Verification
  include PublicIdGenerator

  before_create :set_phone_verification_status
 
  encrypts :phone_number, deterministic: true
  has_secure_password
  
  COUNTRIES = [
    "JO"
  ].freeze

  enum phone_verification_status: {
    unverified: 0,
    verified: 1
  }, _prefix: :phone

  enum verification_code_permission: {
    "customer_verification": 0
  }, _prefix: :verification_code_permission

  validates :public_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :country, presence: true, inclusion: { in: COUNTRIES }
  validates :phone_number, presence: true, uniqueness: true
  validates :password, presence: true, length: { minimum: 8 }, on: :create
  validates :verification_code_permission, inclusion: { in: Customer.verification_code_permissions  }

  private
  def set_phone_verification_status
    self.phone_verification_status = 0
  end
end
