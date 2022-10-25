class CreateItems < ActiveRecord::Migration[7.0]
  def change
    create_table :items do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :brand_id, null: false

      t.timestamps
    end
  end
end
