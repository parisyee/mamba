module Api
  module V1
    class ProjectsController < ::Api::V1::BaseController
      def index
        render json: { message: "All projects!" }
      end

      def create
        render json: { message: "Create project!" }
      end

      def show
        render json: { message: "Show project!" }
      end

      def update
        render json: { message: "Update project!" }
      end

      def destroy
        render json: { message: "Destroy project!" }
      end
    end
  end
end
