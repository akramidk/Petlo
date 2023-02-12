class Checkout < ApplicationRecord
    include PublicIdGenerator

    belongs_to :customer
    belongs_to :cart
    belongs_to :address

    enum status: {
        unused: 0,
        used: 1
    }

    validates :public_id, presence: { message: 2007000 }, uniqueness: { message: 2007001 }
    validates :customer_id, presence: { message: 2007002 }
    validates :cart_id, presence: { message: 2007003 }
    validates :address_id, presence: { message: 2007004 }
    validates :cart_amount, presence: { message: 2007005 }
    validates :delivery_amount, presence: { message: 2007006 }
    validates :amount, presence: { message: 2007007 }
    validates :currency, presence: { message: 2007008 }, inclusion: { in: CONSTANTS::CURRENCIES, message: 2007009 }
end