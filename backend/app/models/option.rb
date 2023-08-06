class Option < ApplicationRecord
  include PublicIdGenerator

  has_many :names, class_name: "OptionName"
  has_many :values, class_name: "OptionValue"

  belongs_to :item

  validates :public_id, presence: true, uniqueness: true
  validates :item_id, presence: true
  validates :weighted, inclusion: [true, false]
end
