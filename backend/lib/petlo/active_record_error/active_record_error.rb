class ActiveRecordError
  class << self
    def extract(object:)
      errors = object.record.errors.as_json
      error_keys = errors.keys

      errors[error_keys[0]][0]
    end
  end
end
