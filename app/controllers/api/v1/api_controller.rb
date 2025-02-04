module Api
  module V1
    class ApiController < ActionController::API
      before_action :doorkeeper_authorize!
    end
  end
end
