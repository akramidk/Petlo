class OrderItem < ApplicationRecord
    belongs_to :order

    has_one :item
    has_one :variant

    validates :order_id, presence: { message:  }
    validates :item_id, presence: { message:  }, uniqueness: { scope: [:order_id], message:  }
    validates :variant_id, presence: { message:  }, uniqueness: { scope: [:item_id], message:  }
    validates :price, presence: { message:  }
    validates :quantity, presence: { message:  }
    validates :total_price, presence: { message:  }
end
