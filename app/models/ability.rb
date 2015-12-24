class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
    if user.has_role? :admin
      can :manage, :all

      can :access, :rails_admin
      can :dashboard
    else
      can :view, Ingress::Agent
      can :view, Ingress::MissionSeries
      can :view, Ingress::Mission
      can :view, Ingress::Point
    end
  end
end
