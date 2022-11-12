module VariantOption::OptionMethods
  def names
    OptionName.where(option_id: self.option_id)
  end

  def values
    OptionValue.where(option_id: self.option_id, number: self.option_value_number)
  end
end
