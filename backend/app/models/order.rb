class Order < ApplicationRecord
    include PublicIdGenerator

    has_one :customer
    has_one :autoship
    has_one :payment
    has_one :address

    has_many :items, class_name: 'OrderItem'
    has_many :pets, class_name: 'OrderPet'

    before_validation :calculate_the_amount

    enum status: {
        preparing: 0,
        out_for_delivery: 1,
        delivered: 2,
        canceled: 3
    }

    validates :public_id, presence: { message: 2008000 }, uniqueness: { message: 2008001 }
    validates :customer_id, presence: { message: 2008002 }
    #TODO remove it validates :payment_id, presence: { message: 2008003 } 
    validates :address_id, presence: { message: 2008004 }
    validates :cart_amount, presence: { message: 2008005 }
    validates :delivery_amount, presence: { message: 2008006 }
    validates :amount, presence: { message: 2008007 }
    validates :currency, presence: { message: 2008008 }, inclusion: { in: CONSTANTS::CURRENCIES.keys, message: 2008009 }

    private
    def calculate_the_amount
        self.amount = self.cart_amount.to_i + self.delivery_amount.to_i
    end
end
