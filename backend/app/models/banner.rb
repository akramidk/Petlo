class Banner < ApplicationRecord
    # TODO add error messages

    include PublicIdGenerator

    has_many :details, class_name: "BannerDetail"

    validates :public_id, presence: true, uniqueness: true
    validates :order, presence: true, uniqueness: true
    validates :path, presence: true
end
