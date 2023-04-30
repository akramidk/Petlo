class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.string :public_id, null: false, unique: true
      t.integer :status, null: false, default: 0
      t.bigint :customer_id, null: false
      t.bigint :autoship_id
      t.bigint :payment_id, null: false
      t.bigint :address_id, null: false
      t.integer :cart_amount, null: false
      t.integer :delivery_amount, null: false
      t.integer :amount, null: false
      t.string :currency, null: false

      t.timestamps
    end
  end
end
