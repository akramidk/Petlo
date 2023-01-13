require 'rails_helper'

RSpec.describe Customer, type: :model do
  valid_customer = Customer.create!(
    name: "Akram",
    country: "JO",
    phone_number: "+962790119952",
    password: "12345678"
  )

  describe "creating a customer" do
    it "is valid with valid attributes" do
      expect(valid_customer).to be_valid
    end
  
    it "is not valid, public_id is empty" do
      def customer
        begin
          Customer.create!(
            public_id: "",
            name: "Akram",
            country: "JO",
            phone_number: "+962790119951",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
      
      expect(customer).to eq("public_id_required")
    end
    
    it "is not valid, name is empty" do
      def customer
        begin
          Customer.create!(
            country: "JO",
            phone_number: "+962790119951",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end

      expect(customer).to eq("name_required")
    end
  
    it "is not valid, country is empty" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            phone_number: "+962790119951",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
    
      expect(customer).to eq("country_required")  
    end
  
    it "is not valid, country is invalid" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            country: "XX",
            phone_number: "+962790119951",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
     
      expect(customer).to eq("invalid_country")
    end
  
    it "is not valid, phone_number is empty" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            country: "JO",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
    
      expect(customer).to eq("phone_number_required")  
    end
  
    it "is not valid, phone_number is not unique" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            country: "JO",
            phone_number: "+962790119952",
            password: "12345678" 
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
    
      expect(customer).to eq("phone_number_used_before")
    end
  
    it "is not valid, password is empty" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            country: "JO",
            phone_number: "+962790119951"
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
    
      expect(customer).to eq("password_required")  
    end
    
    it "is not valid, password is too short" do
      def customer
        begin
          Customer.create!(
            name: "Akram",
            country: "JO",
            phone_number: "+962790119951",
            password: "1234567"
          )
        rescue ActiveRecord::RecordInvalid => invalid
          ActiveRecordError.extract(object: invalid)
        end
      end
    
      expect(customer).to eq("password_too_short")  
    end
  end

  describe "generate verification code" do
    code = valid_customer.generate_verification_code(
      permission: ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION]
    )
    
    it "is valid with customer_verification permission" do
      expect(valid_customer.verification_code).to eq(code)
      expect(valid_customer.verification_code_permission).to eq(
        ENUM::VERIFICATION_CODE_PERMISSIONS[:CUSTOMER_VERIFICATION]
      )
      expect(valid_customer.verification_code_created_at <= Time.now).to eq(true)
    end
  end
end
