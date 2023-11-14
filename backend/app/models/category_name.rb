class CategoryName < ApplicationRecord
    belongs_to :category

    validates :category_id, presence: true, uniqueness: { scope: :language  }
    validates :language, presence: true, inclusion: { in: CONSTANTS::LANGUAGES }
    validates :value, presence: true
end
