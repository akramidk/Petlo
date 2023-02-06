class CartItem < ApplicationRecord
    belongs_to :cart

    validates :cart_id, presence: { message: 2006000 }
    validates :item_id, presence: { message: 2006001 }
    validates :variant_id, presence: { message: 2006002 }
end
