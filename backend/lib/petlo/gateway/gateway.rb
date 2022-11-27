class GatewayLib
  class << self
    def create_a_card(processor:, data:)
      "#{processor}Lib".constantize.create_a_card(data: data)
    end
  end
end
