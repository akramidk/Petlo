class CreateBanners < ActiveRecord::Migration[7.0]
  def change
    create_table :banners do |t|
      t.string :public_id
      t.string :path

      t.timestamps
    end
  end
end
