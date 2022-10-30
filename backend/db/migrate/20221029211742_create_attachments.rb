class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments do |t|
      t.string :public_id, null: false, unique: true
      t.bigint :attachable_id, null: false
      t.string :attachable_type, null: false
      t.boolean :private

      t.timestamps
    end
  end
end
