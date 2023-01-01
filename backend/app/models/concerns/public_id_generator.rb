require 'nanoid'

module PublicIdGenerator
  extend ActiveSupport::Concern

  included do
    before_validation :set_public_id, if: -> { self.public_id == nil }
  end

  PUBLIC_ID_ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  PUBLIC_ID_LENGTH = 16

  def set_public_id
    loop do
      self.public_id = generate_public_id
        return unless self.class.where(public_id: self.public_id).exists? 
    end
  end

  def generate_public_id
    Nanoid.generate(size: PUBLIC_ID_LENGTH, alphabet: PUBLIC_ID_ALPHABET)
    end
end
