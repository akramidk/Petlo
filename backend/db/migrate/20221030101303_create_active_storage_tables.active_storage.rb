class CreateActiveStorageTables < ActiveRecord::Migration[5.2]
  def change
    create_table :active_storage_blobs do |t|
      t.string   :key, null: false, unique: true
      t.string   :filename, null: false
      t.string   :content_type
      t.text     :metadata
      t.string   :service_name, null: false
      t.bigint   :byte_size, null: false
      t.string   :checksum

      t.datetime :created_at, null: false
    end

    create_table :active_storage_attachments do |t|
      t.string     :name, null: false, unique: true
      t.bigint :record_id, null: false, unique: true
      t.string :record_type, null: false, unique: true
      t.bigint :blob_id, null: false, unique: true

      t.datetime :created_at, null: false
    end

    create_table :active_storage_variant_records do |t|
      t.bigint :blob_id, null: false, unique: true
      t.string :variation_digest, null: false, unique: true
    end
  end
end
