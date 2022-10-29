class CreateVariants < ActiveRecord::Migration[7.0]
  def change
    create_table :variants do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :item_id, null: false

      t.timestamps
    end
  end
end
