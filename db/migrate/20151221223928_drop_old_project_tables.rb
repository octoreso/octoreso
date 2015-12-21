class DropOldProjectTables < ActiveRecord::Migration
  def change
    drop_table "categories" do |t|
      t.string   "name"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    drop_table "gamedata_descriptors" do |t|
      t.string   "name"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    drop_table "gamedata_games" do |t|
      t.string   "name"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    drop_table "gamedata_recipe_resource_modes" do |t|
      t.string   "name"
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    drop_table "gamedata_recipe_resources" do |t|
      t.integer  "recipe_id"
      t.integer  "resource_id"
      t.integer  "quantity"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.integer  "recipe_resource_mode_id"
    end

    drop_table "gamedata_recipes" do |t|
      t.integer  "game_id"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "name"
    end

    drop_table "gamedata_resource_descriptors" do |t|
      t.integer  "resource_id",   null: false
      t.integer  "descriptor_id", null: false
      t.datetime "created_at"
      t.datetime "updated_at"
    end

    drop_table "gamedata_resources" do |t|
      t.integer  "game_id"
      t.string   "name"
      t.string   "source_url"
      t.datetime "created_at"
      t.datetime "updated_at"
      t.string   "icon_file_name"
      t.string   "icon_content_type"
      t.integer  "icon_file_size"
      t.datetime "icon_updated_at"
    end

    drop_table "posts" do |t|
      t.string   "title"
      t.string   "subtitle"
      t.integer  "category_id"
      t.text     "content"
      t.datetime "created_at"
      t.datetime "updated_at"
    end
  end
end
