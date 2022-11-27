class CreateCheckoutCards < ActiveRecord::Migration[7.0]
  def change
    create_table :checkout_cards do |t|
      t.bigint :card_id, null: false, unique: true
      t.string :processor_card_id, null: false

      t.timestamps
    end
  end
end
