module SessionsHelper
  def self.information(customer:)
    { customer: { name: customer.name } }
  end
end
