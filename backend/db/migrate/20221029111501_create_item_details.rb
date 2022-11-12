class CreateItemDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :item_details do |t|
      t.bigint :item_id, null: false
      t.string :language
      t.string :name

      t.timestamps
    end
  end
end
