class CreateVariantOptions < ActiveRecord::Migration[7.0]
  def change
    create_table :variant_options do |t|
      t.bigint :variant_id, null: false
      t.bigint :option_id, null: false
      t.integer :option_number, null: false

      t.timestamps
    end
  end
end
