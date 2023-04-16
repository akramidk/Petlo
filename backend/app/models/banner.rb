class Banner < ApplicationRecord
    # TODO add error messages

    include PublicIdGenerator

    has_many :details, class_name: "BannerDetail"

    validates :public_id, presence: true, uniqueness: true
end
