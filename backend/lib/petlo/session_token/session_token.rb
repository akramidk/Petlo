class SessionToken
  class << self
    SECRET_KEY = ENV["JWT_SECRET_KEY"]
    ALGORITHM = "HS256" 

    @@public_id = nil
    @@phone_number = nil
    @@limited = false
    @@limited_for = nil
    @@expire_at = nil

    def generate(public_id:, phone_number:, limited: false, limited_for: nil)
      @@public_id = public_id
      @@phone_number = phone_number
      @@limited = limited
      @@limited_for = limited_for
      @@expire_at = (Time.now + CONSTANTS::TIMES[:LIMITED_SESSION_TOKEN_EXP_AFTER]).to_i if limited
    
      JWT.encode payload, SECRET_KEY, ALGORITHM
    end

    def decode(token:)
      begin
        decoded_token = JWT.decode token, SECRET_KEY, true, { algorithm: ALGORITHM }
        decoded_token[0]
      rescue
        nil
      end
    end

    private
    def payload
      if @@limited
        payload = {
          public_id: @@public_id,
          phone_number: @@phone_number,
          limited: @@limited,
          limited_for: @@limited_for,
          exp: @@expire_at,
          created_at: Time.now
        }
      else
        payload = {
          public_id: @@public_id,
          phone_number: @@phone_number,
          limited: @@limited,
          created_at: Time.now
        }
      end
    end
  end
end
