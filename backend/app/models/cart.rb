class Cart < ApplicationRecord
    include PublicIdGenerator
    include Summary
    include Total

    belongs_to :customer

    has_many :items, class_name: "CartItem"

    enum status: {
        unused: 0,
        used: 1
    }
  
    validates :public_id, presence: { message: 2005000 }, uniqueness: { message: 2005001 }
    validates :customer_id, presence: { message: 2005002 }
end