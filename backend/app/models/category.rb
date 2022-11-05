class Category < ApplicationRecord
  include PublicIdGenerator
  extend Items 

  has_many :relations 
  has_many :items, through: :relations

  validates :public_id, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: { scope: :parent_id }
end
