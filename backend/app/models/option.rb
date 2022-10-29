class Option < ApplicationRecord
  include PublicIdGenerator

  has_many :names, class_name: "OptionName"
  has_many :values, class_name: "OptionValue"

  belongs_to :item

  validates :public_id, presence: true, uniqueness: true
  validates :item_id, presence: true
  validates :weighted, inclusion: [true, false]
  with_options if: -> { self.weighted } do
    validates :unit, presence: true, inclusion: { in: CONSTANTS::OPTION_UNITS.keys }
  end
end
