class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?
    return admin if user.has_role? :admin

    authenticated(user)
  end

  def admin
    can :manage, :all
  end

  def authenticated(user)
    can [:read, :edit], Ingress::Community, id: user.user_communities.map(&:community_ids)
  end
end
