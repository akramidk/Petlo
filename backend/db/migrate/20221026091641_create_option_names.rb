class CreateOptionNames < ActiveRecord::Migration[7.0]
  def change
    create_table :option_names do |t|
      t.bigint :option_id, null: false
      t.string :language
      t.string :value

      t.timestamps
    end
  end
end
