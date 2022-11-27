class CreateCards < ActiveRecord::Migration[7.0]
  def change
    create_table :cards do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.string :processor, null: false
      t.string :brand, null: false
      t.string :last4, null: false
      t.integer :exp_month, null: false
      t.integer :exp_year, null: false
      t.string :fingerprint, null: false

      t.timestamps
    end
  end
end
