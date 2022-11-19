class CreateVariantPrices < ActiveRecord::Migration[7.0]
  def change
    create_table :variant_prices do |t|
      t.bigint :variant_id, null: false
      t.string :country, null: false
      t.integer :value, null: false

      t.timestamps
    end
  end
end
