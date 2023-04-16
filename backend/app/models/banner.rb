class Banner < ApplicationRecord
    # TODO add error messages

    validates :public_id, presence: true, uniqueness: true
end
