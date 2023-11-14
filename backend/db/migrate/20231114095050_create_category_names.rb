class CreateCategoryNames < ActiveRecord::Migration[7.0]
  def change
    create_table :category_names do |t|
      t.bigint :category_id, null: false
      t.string :language, null: false
      t.string :value, null: false

      t.timestamps
    end
  end
end
