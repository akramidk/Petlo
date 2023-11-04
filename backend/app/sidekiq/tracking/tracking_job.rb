class Tracking::TrackingJob
  include Sidekiq::Job

  require 'facebookbusiness'

  def perform(event, user_agent, ip, customer_public_id, customer_phone_number)
    access_token = ENV["FACEBOOK_ADS_ACCESS_TOKEN"]
    pixel_id = ENV["FACEBOOK_ADS_PIXEL_ID"]

    FacebookAds.configure do |config|
      config.access_token = access_token
    end

    user_data = FacebookAds::ServerSide::UserData.new(
      phones: [customer_phone_number],
      external_id: customer_public_id,
      client_user_agent: user_agent,
      client_ip_address: ip
    )

    event = FacebookAds::ServerSide::Event.new(
      event_name: event,
      event_time: Time.now.to_i,
      user_data: user_data,
      action_source: 'system_generated'
    )

    request = FacebookAds::ServerSide::EventRequest.new(
      pixel_id: pixel_id,
      events: [event],
      test_event_code: "TEST67487"
    )

    request.execute
  end
end
