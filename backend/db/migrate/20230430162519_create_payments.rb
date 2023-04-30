class CreatePayments < ActiveRecord::Migration[7.0]
  def change
    create_table :payments do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :order_id, null: false, unique: true
      t.integer :status, null: false, default: 0
      t.integer :method, null: false

      t.timestamps
    end
  end
end
