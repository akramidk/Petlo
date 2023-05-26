class CreateAutoshipItems < ActiveRecord::Migration[7.0]
  def change
    create_table :autoship_items do |t|
      t.bigint :autoship_id, null: false
      t.bigint :item_id, null: false
      t.bigint :variant_id, null: false
      t.integer :quantity, null: false

      t.timestamps
    end
  end
end
