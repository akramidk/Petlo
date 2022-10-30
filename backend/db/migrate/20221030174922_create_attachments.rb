class CreateAttachments < ActiveRecord::Migration[7.0]
  def change
    create_table :attachments do |t|
      t.bigint :blob_id, null: false, unique: true
      t.bigint :attachable_id, null: false, unique: true
      t.string :attachable_type, null: false, unique: true

      t.timestamps
    end
  end
end
