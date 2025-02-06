module Api
  module V1
    class BaseController < ActionController::API
      before_action :doorkeeper_authorize!
    end
  end
end
