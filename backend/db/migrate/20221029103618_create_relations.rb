class CreateRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :relations do |t|
      t.bigint :item_id, null: false
      t.bigint :category_id, null: false

      t.timestamps
    end
  end
end
