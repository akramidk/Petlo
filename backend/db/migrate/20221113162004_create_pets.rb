class CreatePets < ActiveRecord::Migration[7.0]
  def change
    create_table :pets do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.string :name
      t.string :kind
      t.string :breed
      t.integer :gender

      t.timestamps
    end
  end
end
