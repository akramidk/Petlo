class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.bigint :order_id, null: false
      t.bigint :item_id, null: false
      t.bigint :variant_id, null: false
      t.integer :price, null: false
      t.integer :quantity, null: false
      t.integer :total_price, null: false

      t.timestamps
    end
  end
end
