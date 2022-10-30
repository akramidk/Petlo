class Attachment < ApplicationRecord
  include PublicIdGenerator

  has_one_attached :file

  validates :public_id, presence: true, uniqueness: true
  validates :private, inclusion: [true, false]
end
