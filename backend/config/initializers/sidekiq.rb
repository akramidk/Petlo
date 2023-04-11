require 'sidekiq/web'

Sidekiq.configure_server do |config|
    config.redis = { url: 'redis://redis:6379/1' }
end
    
Sidekiq.configure_client do |config|
    config.redis = { url: 'redis://redis:6379/1' }
end  

Sidekiq::Web.use Rack::Auth::Basic do |username, password|
    username == ENV["SIDEKIQ_USERNAME"] && password == ENV["SIDEKIQ_PASSWORD"]
end