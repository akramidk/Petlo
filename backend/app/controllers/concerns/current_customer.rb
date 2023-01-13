module CurrentCustomer
   extend ActiveSupport::Concern
  
   @@session_token = nil
   @@payload = nil

   def current_customer(permission: nil, verified:)
     @@session_token = request.headers["Authorization"].split(' ').last if request.headers["Authorization"]
     @@payload = SessionToken.decode(token: @@session_token)

     if !@@payload || @@payload["limited_for"] != permission || !retrieve_the_customer(verified: verified)
        raise(RuntimeError, 1000001)
     end
   end

   private
   def retrieve_the_customer(verified:)
     @customer = Customer.find_by(
       public_id: @@payload["public_id"],
       phone_number: @@payload["phone_number"],
       phone_verification_status: verified,
       deleted: nil
     )
   end
end