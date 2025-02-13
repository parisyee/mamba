# frozen_string_literal: true

# Project model
class Project < ApplicationRecord
  belongs_to :user

  validates :name, presence: true
end
