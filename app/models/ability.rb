class Ability
  include CanCan::Ability

  def initialize(user)
    admin
  end

  def admin
    can :manage, :all
  end

  def user
  end
end
