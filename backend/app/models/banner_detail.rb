class BannerDetail < ApplicationRecord
    # TODO add error messages

    has_one_attached :image

    validates :banner_id, presence: true
    validates :country, presence: true, uniqueness: { scope: :banner_id }
    validates :language, presence: true, uniqueness: { scope: :banner_id }
    validates :variant, presence: true, uniqueness: { scope: :banner_id }
end
