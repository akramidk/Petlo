class CreateAddresses < ActiveRecord::Migration[7.0]
  def change
    create_table :addresses do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :customer_id, null: false
      t.string :name, null: false
      t.string :longitude, null: false
      t.string :latitude, null: false

      t.timestamps
    end
  end
end
