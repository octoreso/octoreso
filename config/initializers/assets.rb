Rails.application.config.assets.precompile += [
  # JS
  'ingress/index.js',
  # CSS
  'ingress.css.scss'
]

Rails.application.config.assets.initialize_on_precompile = true
