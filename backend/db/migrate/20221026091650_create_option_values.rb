class CreateOptionValues < ActiveRecord::Migration[7.0]
  def change
    create_table :option_values do |t|
      t.bigint :option_id, null: false
      t.integer :number, null: false
      t.string :language
      t.string :value

      t.timestamps
    end
  end
end
