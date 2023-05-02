class OrderPet < ApplicationRecord
    belongs_to :order

    has_one :pet

    validates :order_id, presence: { message: 2010000 }
    validates :pet_id, presence: { message: 2010001 }, uniqueness: { scope: [:order_id], message: 2010002 }
end
