class Variant < ApplicationRecord
  include PublicIdGenerator

  has_many :options, class_name: "VariantOption"
  has_many :availabilities, class_name: "VariantAvailability"
  has_many :preices, class_name: "VariantPrice"

  belongs_to :item

  validates :public_id, presence: true, uniqueness: true
  validates :item_id, presence: true
end
