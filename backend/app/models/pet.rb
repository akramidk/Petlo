class Pet < ApplicationRecord
  include PublicIdGenerator

  belongs_to :customer

  # enum gender: {
  #   "male": 0,
  #   "female": 1
  # }, _prefix: :gender

  validates :public_id, presence: true, uniqueness: true
  validates :customer_id, presence: true
  validates :name, presence: true
  validates :kind, presence: true, inclusion: { in: CONSTANTS::PETS.keys }
  # validates :breed, presence: true, inclusion: { in: CONSTANTS::PETS[self.kind].breeds.keys }
end
