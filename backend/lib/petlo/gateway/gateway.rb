class GatewayLib
  class << self
    def create_a_customer(processor:, data:)
      "#{processor}Lib".constantize.create_a_customer(data: data)
    end
    
    def create_a_card(processor:, data:)
      "#{processor}Lib".constantize.create_a_card(data: data)
    end

    def make_payment(processor:, data:)
      "#{processor}Lib".constantize.make_payment(data: data)
    end
  end
end
