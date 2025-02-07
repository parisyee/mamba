module Api
  module V1
    class UsersController < ::Api::V1::BaseController
      skip_before_action :doorkeeper_authorize!, only: %i[create]

      def create
        user = User.new(user_params)

        if user.save
          RegistrationMailer.confirm_email(user).deliver_later

          render json: user, status: :created
        else
          render json: user.errors, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
      end
    end
  end
end