class AutoshipPet < ApplicationRecord
  belongs_to :autoship
  belongs_to :pet

  validates :autoship_id, presence: { message: 2015000 }
  validates :pet_id, presence: { message: 2015001 }, uniqueness: { scope: :autoship_id, message: 2015002 }
end