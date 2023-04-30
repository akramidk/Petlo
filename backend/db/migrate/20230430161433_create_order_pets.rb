class CreateOrderPets < ActiveRecord::Migration[7.0]
  def change
    create_table :order_pets do |t|
      t.bigint :order_id, null: false
      t.bigint :pet_id, null: false

      t.timestamps
    end
  end
end
