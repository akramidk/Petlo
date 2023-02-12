class CreateCheckouts < ActiveRecord::Migration[7.0]
  def change
    create_table :checkouts do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.bigint :cart_id, null: false
      t.bigint :address_id, null: false
      t.integer :status, null: false, default: 0
      t.integer :cart_amount, null: false
      t.integer :delivery_amount, null: false
      t.integer :amount, null: false
      t.string :currency, null: false

      t.timestamps
    end
  end
end
