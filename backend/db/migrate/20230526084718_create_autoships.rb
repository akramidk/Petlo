class CreateAutoships < ActiveRecord::Migration[7.0]
  def change
    create_table :autoships do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.string :name, null: false
      t.integer :status, null: false
      t.bigint :address_id, null: false
      t.integer :payment_method, null: false
      t.bigint :payment_card_id
      t.integer :recurring_interval, null: false
      t.integer :recurring_interval_count, null: false
      t.date :next_shipment_on
      t.integer :next_shipment_collect_payment_attempts

      t.timestamps
    end
  end
end
