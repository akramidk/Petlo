class Card < ApplicationRecord
  include PublicIdGenerator

  belongs_to :customer

  validates :public_id, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :processor, presence: true
  validates :processor_card_id, presence: true
  validates :brand, presence: true
  validates :last4, presence: true
  validates :exp_month, presence: true, numericality: { greater_than_or_equal_to: 1, less_than_or_equal_to: 12 }
  validates :exp_year, presence: true
  validates :fingerprint, presence: true, uniqueness: { scope: [:customer_id, :processor] }
end
