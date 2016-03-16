module Admin
  module Ingress
    class UsersController < Admin::BaseController

      def index
        @users = User.all.order(:id)

        authorize! :edit, User
      end

      def show
        @user = User.find(params[:id])
        authorize! :edit, @user

        @communities = ::Ingress::Community.all
      end


      def update
        @user = User.find(params[:id])
        authorize! :edit, @user

        if @user.update(update_params)
          redirect_to admin_ingress_users_path, notice: "User updated."
        else
          @communities = ::Ingress::Community.all
          render action: :show
        end
      end

      private

      def update_params
        params.require(:user).permit(community_ids: [])
      end
    end
  end
end
