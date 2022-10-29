class CreateOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :options do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :item_id, null: false
      t.boolean :weighted
      t.string :unit

      t.timestamps
    end
  end
end
