class CreateCarts < ActiveRecord::Migration[7.0]
  def change
    create_table :carts do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.integer :status, null: false, default: 0

      t.timestamps
    end
  end
end
