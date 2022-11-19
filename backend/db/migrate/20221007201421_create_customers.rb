class CreateCustomers < ActiveRecord::Migration[7.0]
  def change
    create_table :customers do |t|
      t.string :public_id, null: false, unique: true
      t.string :name, null: false
      t.string :country, null: false
      t.string :phone_number, null: false
      t.integer :phone_verification_status, null: false, default: 0
      t.string :password_digest, null: false
      t.integer :verification_code
      t.integer :verification_code_permission
      t.datetime :verification_code_created_at
      t.boolean :deleted

      t.timestamps
    end
  end
end
