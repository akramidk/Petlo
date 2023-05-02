class Payment < ApplicationRecord
    include PublicIdGenerator

    belongs_to :order

    enum status: {
        uncollected: 0,
        collected: 1,
    }

    enum method: {
        cash: 0,
        card: 1,
    }

    validates :public_id, presence: { message: 2011000 }, uniqueness: { message: 2011001 }
    validates :order_id, presence: { message: 2011002 }, uniqueness: { message: 2011003 }
end
