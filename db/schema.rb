# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160114021437) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingress_agents", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ingress_communities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingress_mission_points", force: :cascade do |t|
    t.integer  "mission_id"
    t.integer  "point_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingress_mission_series", force: :cascade do |t|
    t.string   "name",                                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "community_id"
    t.decimal  "min_lat",      precision: 9, scale: 6
    t.decimal  "min_long",     precision: 9, scale: 6
    t.decimal  "max_lat",      precision: 9, scale: 6
    t.decimal  "max_long",     precision: 9, scale: 6
  end

  create_table "ingress_missions", force: :cascade do |t|
    t.string   "name",                                                         null: false
    t.integer  "agent_id",                                                     null: false
    t.string   "mission_url",                                                  null: false
    t.integer  "sequence_type",                                                null: false
    t.integer  "series_type",                                                  null: false
    t.integer  "mission_series_id"
    t.integer  "series_index"
    t.integer  "difficulty_type",                                  default: 0, null: false
    t.integer  "field_trip_waypoint_type",                         default: 0, null: false
    t.integer  "field_trip_waypoint_qty",                          default: 0, null: false
    t.integer  "passphrase_type",                                              null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "community_id"
    t.integer  "validation_level",                                 default: 0, null: false
    t.decimal  "min_lat",                  precision: 9, scale: 6
    t.decimal  "min_long",                 precision: 9, scale: 6
    t.decimal  "max_lat",                  precision: 9, scale: 6
    t.decimal  "max_long",                 precision: 9, scale: 6
  end

  create_table "ingress_points", force: :cascade do |t|
    t.decimal  "lat",         precision: 9, scale: 6, null: false
    t.decimal  "long",        precision: 9, scale: 6, null: false
    t.string   "portal_name"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.integer  "resource_id"
    t.string   "resource_type"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "roles", ["name", "resource_type", "resource_id"], name: "index_roles_on_name_and_resource_type_and_resource_id", using: :btree
  add_index "roles", ["name"], name: "index_roles_on_name", using: :btree

  create_table "sessions", force: :cascade do |t|
    t.string   "session_id", null: false
    t.text     "data"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "sessions", ["session_id"], name: "index_sessions_on_session_id", unique: true, using: :btree
  add_index "sessions", ["updated_at"], name: "index_sessions_on_updated_at", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "name"
    t.string   "provider"
    t.string   "uid"
    t.string   "image"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

  create_table "users_roles", id: false, force: :cascade do |t|
    t.integer "user_id"
    t.integer "role_id"
  end

  add_index "users_roles", ["user_id", "role_id"], name: "index_users_roles_on_user_id_and_role_id", using: :btree

end
