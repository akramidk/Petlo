class CreateItemNames < ActiveRecord::Migration[7.0]
  def change
    create_table :item_names do |t|
      t.bigint :item_id, null: false
      t.string :language
      t.string :value

      t.timestamps
    end
  end
end
