class OrderPet < ApplicationRecord
    belongs_to :order

    has_one :pet

    validates :order_id, presence: { message:  }
    validates :pet_id, presence: { message:  }, uniqueness: { scope: [:order_id], message:  }
end
