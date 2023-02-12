module VariantOption::OptionMethods
  def retrieve
    Option.find_by(id: self.option_id)
  end

  def names
    OptionName.where(option_id: self.option_id)
  end

  def values
    OptionValue.where(option_id: self.option_id, number: self.option_value_number)
  end

  def unit
    self.retrieve.unit
  end
end