class BrandCountrySetting < ApplicationRecord
    belongs_to :brand

    validates :brand_id, presence: true, uniqueness: { scope: :country  }
    validates :country, presence: true, inclusion: { in: CONSTANTS::COUNTRIES.keys }
end
