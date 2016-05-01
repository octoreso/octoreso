# == Schema Information
#
# Table name: translations
#
#  id             :integer          not null, primary key
#  locale         :string
#  key            :string
#  value          :text
#  interpolations :text
#  is_proc        :boolean          default(FALSE)
#  created_at     :datetime
#  updated_at     :datetime
#

class Translation < I18n::Backend::ActiveRecord::Translation
  scope :default, ->{ where(locale: I18n.default_locale) }
  scope :for_javascript, ->{ where("key NOT LIKE 'backend.%'") }

  class << self
    def to_flat_hash
      self.all.map { |t| ["#{t.locale}.#{t.key}", t.value] }.sort_by(&:first).to_h
    end

    def migrate
      # This is run on every deploy! Empty after use to prevent pointless insertions/deletions.
      store 'backend.communities.approve_button', 'Approve'
      store 'activerecord.models.ingress/community', 'Community:P'
    end

    def store(key, value)
      key  = key.split('.')
      hash = hash_to_store({}, key, value)


      ::I18n::Backend::ActiveRecord.new.store_translations :en, hash
    end

    def hash_to_store(hash, keys, value)
      if keys.present?
        key = keys.pop!

        if value.present?
          hash = { key => value }
          value = nil
        else
          hash = { key => hash }
        end

        return hash_to_store(hash, keys, value)
      else
        return hash
      end
    end
  end
end
