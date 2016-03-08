class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?
    return admin if user.has_role? User::ROLE_ADMIN

    authenticated(user)
  end

  def admin
    can :manage, :all
  end

  def authenticated(user)
    can :edit, ::Ingress::Community, id: user.user_communities.map(&:community_id)
  end
end
