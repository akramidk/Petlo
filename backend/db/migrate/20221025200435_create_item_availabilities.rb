class CreateItemAvailabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :item_availabilities do |t|
      t.bigint :item_id, null: false
      t.string :country
      t.boolean :value

      t.timestamps
    end
  end
end
