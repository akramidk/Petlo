class CreateCardPayments < ActiveRecord::Migration[7.0]
  def change
    create_table :card_payments do |t|
      t.bigint :payment_id, null: false, unique: true
      t.bigint :card_id, null: false
      t.string :processed_by, null: false
      t.string :processor_payment_id, null: false

      t.timestamps
    end
  end
end
