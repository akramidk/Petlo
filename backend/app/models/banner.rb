class Banner < ApplicationRecord
    # TODO add error messages

    include PublicIdGenerator

    validates :public_id, presence: true, uniqueness: true
end
