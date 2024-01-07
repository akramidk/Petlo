class Order::MessageJob
  include Sidekiq::Job

  def perform
    SMSMessage.send(to: CONSTANTS::STORES_PHONE_NUMBER, content: "new order")
  end
end
