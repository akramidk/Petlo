class CreateBannerDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :banner_details do |t|
      t.bigint :banner_id, null: false
      t.string :country, null: false
      t.string :language, null: false
      t.string :variant, null: false

      t.timestamps
    end
  end
end
