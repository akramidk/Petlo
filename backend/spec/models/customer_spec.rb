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
  
    it "is not valid, public_id not unique" do
      expect{
        Customer.create!(
          public_id: valid_customer.public_id,
          name: "Akram",
          country: "JO",
          phone_number: "+962790119951",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it "is not valid, name is empty" do
      expect{
        Customer.create!(
          country: "JO",
          phone_number: "+962790119951",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  
    it "is not valid, country is empty" do
      expect{
        Customer.create!(
          name: "Akram",
          phone_number: "+962790119951",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  
  
    it "is not valid, country is invalid" do
      expect{
        Customer.create!(
          name: "Akram",
          country: "XX",
          phone_number: "+962790119951",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  
  
    it "is not valid, phone_number is empty" do
      expect{
        Customer.create!(
          name: "Akram",
          country: "JO",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  
    it "is not valid, phone_number is not unique" do
      expect{
        Customer.create!(
          name: "Akram",
          country: "JO",
          phone_number: "+962790119952",
          password: "12345678" 
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  
    it "is not valid, password is empty" do
      expect{
        Customer.create!(
          name: "Akram",
          country: "JO",
          phone_number: "+962790119951"
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
    
    it "is not valid, password is too short" do
      expect{
        Customer.create!(
          name: "Akram",
          country: "JO",
          phone_number: "+962790119951",
          password: "1234567"
        )
      }.to raise_error(ActiveRecord::RecordInvalid)
    end
  end

  describe "generate verification code" do
    code = valid_customer.generate_verification_code(permission: "customer_verification")
    
    it "is valid with customer_verification permission" do
      expect(valid_customer.verification_code).to eq(code)
      expect(valid_customer.verification_code_permission).to eq("customer_verification")
      expect(valid_customer.verification_code_created_at <= Time.now).to eq(true)
    end
  end
end
