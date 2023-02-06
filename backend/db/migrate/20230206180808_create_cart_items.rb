class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.bigint :cart_id, null: false
      t.bigint :item_id, null: false
      t.bigint :variant_id, null: false

      t.timestamps
    end
  end
end
