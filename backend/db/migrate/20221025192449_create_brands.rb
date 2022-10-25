class CreateBrands < ActiveRecord::Migration[7.0]
  def change
    create_table :brands do |t|
      t.string :public_id, null: false, unique: true

      t.timestamps
    end
  end
end
