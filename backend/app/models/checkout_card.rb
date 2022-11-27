class CheckoutCard < ApplicationRecord
  belongs_to :card

  validates :card_id, presence: true, uniqueness: true
  validates :processor_card_id, presence: true
end
