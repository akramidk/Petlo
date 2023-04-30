class Payment < ApplicationRecord
    belongs_to :order

    enum status: {
        uncollected: 0,
        collected: 1,
    }

    enum method: {
        cash: 0,
        card: 1,
    }

    validates :public_id, presence: { message:  }, uniqueness: { message:  }
    validates :order_id, presence: { message:  }, uniqueness: { message:  }
end
