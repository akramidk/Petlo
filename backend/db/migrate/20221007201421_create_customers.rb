class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :public_id, null: false, unique: true
      t.string :name
      t.string :country
      t.string :phone_number
      t.integer :phone_verification_status
      t.string :password
      t.integer :verification_code
      t.integer :verification_code_permission
      t.datetime :verification_code_created_at
      t.boolean :deleted

      t.timestamps
    end
  end
end
