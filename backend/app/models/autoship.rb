class Autoship < ApplicationRecord
  include PublicIdGenerator

  belongs_to :customer

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

  validates :public_id, presence: { message: 1 }, uniqueness: { message: 1 }
  validates :customer_id, presence: { message: 1 }
  validates :name, presence: { message: 1 }, uniqueness: { scope: :customer_id, message: 1 }
  validates :payment_card_id, presence: { message: 1 }, if: -> { self.payment_methods == "card" }
  validates :recurring_interval_count, presence: { message: 1 }, numericality: { in: 5..90, message: 1 }, if: -> { self.recurring_intervals == "day" }
  validates :recurring_interval_count, presence: { message: 1 }, numericality: { in: 1..3, message: 1 }, if: -> { self.recurring_intervals == "month" }
end