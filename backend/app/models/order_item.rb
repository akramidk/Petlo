class OrderItem < ApplicationRecord
    belongs_to :order
    belongs_to :item
    belongs_to :variant

    validates :order_id, presence: { message: 2009000 }
    validates :item_id, presence: { message: 2009001 }
    validates :variant_id, presence: { message: 2009003 }
    validates :price, presence: { message: 2009005 }
    validates :quantity, presence: { message: 2009006 }
    validates :total_price, presence: { message: 2009007 }
end