class CreateBrandNames < ActiveRecord::Migration[7.0]
  def change
    create_table :brand_names do |t|
      t.bigint :brand_id, null: false
      t.string :language, null: false
      t.string :value, null: false

      t.timestamps
    end
  end
end
