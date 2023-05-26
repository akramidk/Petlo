class Autoship < ApplicationRecord
  include PublicIdGenerator

  has_many :items, class_name: "AutoshipItem"

  belongs_to :customer
  belongs_to :address
  belongs_to :card, foreign_key: 'payment_card_id', optional: true

  enum status: {
    active: 0,
    inactive: 1,
    deactivated: 2,
  }

  enum payment_method: {
    cash: 0,
    card: 1,
  }

  enum recurring_interval: {
    day: 0,
    month: 1,
  }

  validates :public_id, presence: { message: 2013000 }, uniqueness: { message: 2013001 }
  validates :customer_id, presence: { message: 2013002 }
  validates :name, presence: { message: 2013003 }, uniqueness: { scope: :customer_id, message: 2013004 }
  validates :payment_card_id, presence: { message: 2013005 }, if: -> { self.payment_methods == "card" }
  validates :recurring_interval_count, presence: { message: 2013006 }, numericality: { in: 5..90, message: 2013007 }, if: -> { self.recurring_intervals == "day" }
  validates :recurring_interval_count, presence: { message: 2013006 }, numericality: { in: 1..3, message: 2013007 }, if: -> { self.recurring_intervals == "month" }
end