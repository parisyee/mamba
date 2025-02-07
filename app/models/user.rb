# frozen_string_literal: true

# User model
class User < ApplicationRecord
  has_secure_password
  normalizes :email, with: ->(e) { e.strip.downcase }

  has_many :access_tokens,
           class_name: 'Doorkeeper::AccessToken',
           foreign_key: :resource_owner_id,
           dependent: :delete_all # or :destroy if you need callbacks

  before_create :set_confirmation_token

  private

  def set_confirmation_token
    self.confirmation_token = SecureRandom.hex(10) if valid?
  end
end
