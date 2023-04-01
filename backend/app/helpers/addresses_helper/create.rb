module AddressesHelper::Create
  @@latitude = nil
  @@longitude = nil
  @@language = nil

  GOOGLE_MAPS_API_KEY = ENV["GOOGLE_MAPS_API_KEY"]

  def create(customer:, name:, latitude:, longitude:, language:)
    @@latitude = latitude
    @@longitude = longitude
    @@language = language

    Address.create!(
      customer_id: customer.id,
      name: name,
      latitude: @@latitude,
      longitude: @@longitude,
      details: get_details
    )
  end

  private
  def get_details
    response = HTTParty.get("https://maps.googleapis.com/maps/api/geocode/json?latlng=#{@@latitude},#{@@longitude}&key=#{GOOGLE_MAPS_API_KEY}&language=#{@@language}&result_type=route")
    response.parsed_response["results"][0]["formatted_address"]
  end
end