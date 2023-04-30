class CardPayment < ApplicationRecord
    belongs_to :payment

    has_one :card

    validates :payment_id, presence: { message:  }, uniqueness: { message:  }
    validates :card_id, presence: { message:  }
    validates :processed_by, presence: { message:  }
    validates :processor_payment_id, presence: { message:  }
end
