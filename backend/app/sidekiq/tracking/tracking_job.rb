class Tracking::TrackingJob
  include Sidekiq::Job

  require 'facebookbusiness'

  def perform(event, user_agent, ip, customer_public_id=nil, customer_phone_number=nil, custom_data=nil)    
    access_token = ENV["FACEBOOK_ADS_ACCESS_TOKEN"]
    pixel_id = ENV["FACEBOOK_ADS_PIXEL_ID"]

    FacebookAds.configure do |config|
      config.access_token = access_token
    end

    data = {
      client_user_agent: user_agent,
      client_ip_address: ip
    }

    if customer_public_id && customer_phone_number
      data[:external_id] = customer_public_id
      data[:phones] = [customer_phone_number]
    end

    user_data = FacebookAds::ServerSide::UserData.new(**data)


    event_data = {
      event_name: event,
      event_time: Time.now.to_i,
      user_data: user_data,
      action_source: 'system_generated'
    }

    if event == "Purchase"
      event_data[:custom_data] = FacebookAds::ServerSide::CustomData.new(
        currency: custom_data["currency"],
        value: custom_data["value"]
      )
    end

    event = FacebookAds::ServerSide::Event.new(**event_data)

    request = FacebookAds::ServerSide::EventRequest.new(
      pixel_id: pixel_id,
      events: [event],
      test_event_code: "TEST39693"
    )

    request.execute
  end
end
