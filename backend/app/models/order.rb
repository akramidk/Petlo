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

    validates :public_id, presence: { message:  }, uniqueness: { message:  }
    validates :customer_id, presence: { message:  }
    validates :payment_id, presence: { message:  }
    validates :address_id, presence: { message:  }
    validates :cart_amount, presence: { message:  }
    validates :delivery_amount, presence: { message:  }
    validates :amount, presence: { message:  }
    validates :currency, presence: { message:  }

    private
    def calculate_the_amount
        self.amount = self.cart_amount.to_i + self.delivery_amount.to_i
    end
end
