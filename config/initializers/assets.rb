Rails.application.config.assets.precompile += [
  # JS
  'ingress/index.js',
  'admin/index.js',
  # CSS
  'ingress.css.scss',
  'admin.css.scss'
]

Rails.application.config.assets.initialize_on_precompile = true

Rails.application.config.assets.configure do |env|
  env.context_class.class_eval do
    include ActionView::Helpers::JavaScriptHelper
  end
end
