class Card < ApplicationRecord
  include PublicIdGenerator

  belongs_to :customer

  encrypts :last4
  encrypts :fingerprint, deterministic: true

  validates :public_id, presence: { message: 2002000 }, uniqueness: { message: 2002001 }
  validates :customer_id, presence: { message: 2002002 }
  validates :processor, presence: { message: 2002003 }
  validates :processor_card_id, presence: { message: 2002004 }
  validates :brand, presence: { message: 2002005 }
  validates :last4, presence: { message: 2002006 }
  validates :exp_month, presence: { message: 2002007 }, numericality: { in: 1..12, message: 2002008 }
  validates :exp_year, presence: { message: 2002009 }
  validates :fingerprint, presence: { message: 2002010 }, uniqueness: { scope: [:customer_id, :processor], message: 2002011 }
end
