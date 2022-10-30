class CreateBlobs < ActiveRecord::Migration[7.0]
  def change
    create_table :blobs do |t|
      t.string :public_id, null: false, unique: true
      t.boolean :private

      t.timestamps
    end
  end
end
