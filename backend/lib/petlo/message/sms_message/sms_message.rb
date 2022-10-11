class SMSMessage < Message
  def self.send(to:, content:)
    Releans.send(to: to, content: content)
  end
end
