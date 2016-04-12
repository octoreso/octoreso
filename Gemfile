source 'https://rubygems.org'
ruby '2.3.0'

gem 'rails'
gem 'pg'
gem 'puma'

gem 'aws-sdk'
gem 'figaro'
gem 'responders', '~> 2.0'
gem 'marco-polo'

gem 'devise'
gem 'omniauth'
gem 'omniauth-google-oauth2'
gem 'cancancan'
gem 'simple_form'
gem 'cocoon'

# errors
gem 'rollbar'

# Assets + JS
gem 'handlebars_assets'
gem 'i18n-js', '>= 3.0.0.rc11'
gem 'jbuilder'
gem 'rabl'
gem 'oj'
gem 'sass-rails'
gem 'uglifier'
gem 'coffee-rails'
gem 'jquery-rails'
gem 'bootstrap-sass'
gem 'haml-rails'
gem 'chosen-rails'

group :development do
  gem 'erd'
  gem 'better_errors'
  gem 'html2haml'
  gem 'rails_layout'
  gem 'meta_request'

  gem 'capistrano',               require: false
  gem 'capistrano-rvm',           require: false
  gem 'capistrano-rails',         require: false
  gem 'capistrano-bundler',       require: false
  gem 'capistrano3-puma',         require: false
  gem 'capistrano-figaro-yml',    require: false
  gem 'capistrano-db-tasks' ,     require: false
  gem 'capistrano-rails-console', require: false
end

group :development, :test do
  gem 'annotate'
  gem 'awesome_print'
  gem 'binding_of_caller'
  gem 'bullet'
  gem 'database_cleaner'
  gem 'factory_girl_rails'

  gem 'rspec-rails'
  gem 'rspec-collection_matchers'

  gem 'pry'
  gem 'pry-coolline'
  gem 'pry-rails'
  gem 'pry-rescue'
  gem 'pry-stack_explorer'

  gem 'quiet_assets'
  gem 'rubocop'
  gem 'whiny_validation'
end

group :production do
  gem 'rails_12factor' # assets
end

group :test do
  gem 'capybara'
  gem 'email_spec'
  gem 'capybara-email'
  gem 'factory_girl'
  gem 'fuubar'
  gem 'headless'
  gem 'puffing-billy'
  gem 'selenium-webdriver'
  gem 'shoulda-matchers'
  gem 'simplecov'
  gem 'timecop'
  gem 'turnip'
end
