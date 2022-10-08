class Customer < ApplicationRecord
  include PublicIdGenerator

  before_create :set_phone_verification_status

  has_secure_password
  
  COUNTRIES = [
    "JO"
  ].freeze

  enum phone_verification_status: {
    unverified: 0,
    verified: 1
  }, _prefix: :phone

  validates :public_id, presence: true, uniqueness: true
  validates :name, presence: true
  validates :country, presence: true, inclusion: { in: COUNTRIES }
  validates :phone_number, presence: true, uniqueness: true
  validates :password_digest, presence: true, length: { minimum: 8 }

  private
  def set_phone_verification_status
    self.phone_verification_status = 0
  end
end
