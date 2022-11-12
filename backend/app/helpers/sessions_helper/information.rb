module SessionsHelper::Information
  def information(customer:)
    { customer: { name: customer.name } }
  end
end
