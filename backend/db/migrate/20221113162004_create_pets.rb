class CreatePets < ActiveRecord::Migration[7.0]
  def change
    create_table :pets do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.string :name, null: false
      t.string :kind, null: false
      t.string :breed, null: false
      t.string :gender, null: false

      t.timestamps
    end
  end
end
