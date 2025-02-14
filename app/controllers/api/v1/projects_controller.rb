module Api
  module V1
    class ProjectsController < ::Api::V1::BaseController
      def index
        render json: { projects: current_user.projects }
      end

      def create
        project = current_user.projects.new(name: project_params[:name])

        if project.save
          render json: { project: project }, status: :created
        else
          render json: {
            project: project,
            errors: project.errors
          }, status: :unprocessable_entity
        end
      end

      def show
        project = current_user.projects.find(params[:id])

        render json: { project: project }
      end

      def update
        render json: { message: "Update project!" }
      end

      def destroy
        render json: { message: "Destroy project!" }
      end

      private

      def project_params
        params.require(:project).permit(:name)
      end
    end
  end
end
