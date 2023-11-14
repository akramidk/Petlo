class Category < ApplicationRecord
  include PublicIdGenerator
  extend Items

  has_many :relations 
  has_many :items, through: :relations
  has_many :names, class_name: "CategoryName"

  validates :public_id, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: { scope: :parent_id }
end
