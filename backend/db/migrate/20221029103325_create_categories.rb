class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :public_id, null: false, unique: true
      t.string :name, null: false
      t.bigint :parent_id

      t.timestamps
    end
  end
end
