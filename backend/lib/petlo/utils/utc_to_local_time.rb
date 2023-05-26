module Utils
  def self.utc_to_local_time(country:)
    Time.now + CONSTANTS::DIFFERENCE_BETWEEN_UTC_AND_LOCAL_TIME[country].hours
  end
end