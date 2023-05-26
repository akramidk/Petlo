class CreateAutoshipPets < ActiveRecord::Migration[7.0]
  def change
    create_table :autoship_pets do |t|
      t.bigint :autoship_id, null: false
      t.bigint :pet_id, null: false

      t.timestamps
    end
  end
end
