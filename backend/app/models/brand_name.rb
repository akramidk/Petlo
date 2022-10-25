class BrandName < ApplicationRecord
  belongs_to :brand
  
  LANGUAGE = [
    "ar",
    "en"
  ]

  validates :brand_id, presence: true, uniqueness: { scope: :language  }
  validates :language, presence: true, inclusion: { in: LANGUAGE }
  validates :value, presence: true
end
