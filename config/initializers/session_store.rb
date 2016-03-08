# Be sure to restart your server when you modify this file.

# Octoreso::Application.config.session_store :active_record_store
Octoreso::Application.config.session_store :cookie_store, key: '_Octoreso_session', domain: :all, tld_length: 2
