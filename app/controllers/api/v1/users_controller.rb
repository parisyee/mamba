module Api
  module V1
    class UsersController < ::Api::V1::BaseController
      REQUIRED_PARAMS = %i[email password password_confirmation].freeze

      skip_before_action :doorkeeper_authorize!, only: %i[create]
      before_action :ensure_create_params, only: %i[create]

      def create
        user = User.new(user_params)

        if user.save
          RegistrationMailer.confirm_email(user).deliver_later

          render json: user, status: :created
        else
          render json: { errors: user.errors }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(REQUIRED_PARAMS)
      end

      def ensure_create_params
        return if user_params.keys.length == REQUIRED_PARAMS.length

        render json: { error: 'Missing user params' }, status: :unprocessable_entity
      end
    end
  end
end
