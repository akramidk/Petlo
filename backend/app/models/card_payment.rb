class CardPayment < ApplicationRecord
    belongs_to :payment

    has_one :card

    validates :payment_id, presence: { message: 2012000 }, uniqueness: { message: 2012001 }
    validates :card_id, presence: { message: 2012002 }
    validates :processed_by, presence: { message: 2012003 }
    validates :processor_payment_id, presence: { message: 2012004 }
end
