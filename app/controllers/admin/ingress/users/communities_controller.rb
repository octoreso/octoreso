module Admin
  module Ingress
    module Users
      class CommunitiesController < Admin::BaseController

        before_action :load_user, except: :index
        before_action :can_create, only: [:new, :create]

        def new
          @community = ::Ingress::Community.new
        end

        def create
          @community = ::Ingress::Community.new(create_params)
          @community.users << @user

          if @community.save
            redirect_to admin_ingress_user_path(@user), notice: 'Community was successfully created'
          else
            render action: :new
          end
        end

        private

        def load_user
          @user = ::User.find(params[:user_id])
        end

        def can_create
          authorize! :edit, @user
          authorize! :create, ::Ingress::Community
        end

        def create_params
          params.require(:ingress_community).permit(:name)
        end
      end
    end
  end
end
