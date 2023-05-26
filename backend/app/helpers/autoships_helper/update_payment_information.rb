module AutoshipsHelper::UpdatePaymentInformation
  def update_payment_information(customer:, public_id:, payment:)
    autoship = customer.autoships.find_by(public_id: public_id)
    raise(RuntimeError, 3007006) unless autoship

    payment_card_id = nil
    if payment[:method] == 'card'
      payment_card_id = customer.cards.find_by(public_id: payment[:card][:id])&.id
      raise(RuntimeError, 3007002) unless payment_card_id
    end

    autoship.update!(payment_method: payment[:method], payment_card_id: payment_card_id)
  end
end
