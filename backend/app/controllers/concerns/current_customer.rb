module CurrentCustomer
   extend ActiveSupport::Concern
  
   @@session_token = nil
   @@payload = nil

   def current_customer(permission: nil)
     @@session_token = request.headers["Authorization"].split(' ').last if request.headers["Authorization"]
     @@payload = SessionToken.decode(token: @@session_token)

     return nil if !@@payload || @@payload["limited_for"] != permission

     @customer = Customer.find_by(
       public_id: @@payload["public_id"],
       phone_number: @@payload["phone_number"],
       deleted: nil
     )
   end
end
