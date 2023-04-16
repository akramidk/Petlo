class Banner < ApplicationRecord
    validates :public_id, presence: true, uniqueness: true
    validates :path
end
