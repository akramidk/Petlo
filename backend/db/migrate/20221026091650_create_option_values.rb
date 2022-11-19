class CreateOptionValues < ActiveRecord::Migration[7.0]
  def change
    create_table :option_values do |t|
      t.bigint :option_id, null: false
      t.integer :number, null: false
      t.string :language, null: false
      t.string :value, null: false

      t.timestamps
    end
  end
end
