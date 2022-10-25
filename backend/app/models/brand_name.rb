class BrandName < ApplicationRecord
  belongs_to :brand
  
  validates :brand_id, presence: true, uniqueness: { scope: :language  }
  validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
  validates :value, presence: true
end
