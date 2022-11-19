class CreateVariantAvailabilities < ActiveRecord::Migration[7.0]
  def change
    create_table :variant_availabilities do |t|
      t.bigint :variant_id, null: false
      t.string :country, null: false
      t.boolean :value, null: false

      t.timestamps
    end
  end
end
