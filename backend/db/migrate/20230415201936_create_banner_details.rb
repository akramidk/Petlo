class CreateBannerDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :banner_details do |t|
      t.string :country
      t.string :language
      t.string :variant

      t.timestamps
    end
  end
end
