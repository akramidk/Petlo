class CreateBrandCountrySettings < ActiveRecord::Migration[7.0]
  def change
    create_table :brand_country_settings do |t|
      t.bigint :brand_id, null: false
      t.string :country, null: false
      t.boolean :featured

      t.timestamps
    end
  end
end
