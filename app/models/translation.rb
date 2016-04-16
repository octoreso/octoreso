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
end
