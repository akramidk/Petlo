class BannerDetail < ApplicationRecord
    # TODO add error messages

    has_one_attached :image

    validates :banner_id, presence: true
    validates :country, presence: true
    validates :language, presence: true
    validates :variant, presence: true
end
