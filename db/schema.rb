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

ActiveRecord::Schema.define(version: 20160416132655) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingress_agents", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ingress_communities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                                         null: false
    t.datetime "updated_at",                                         null: false
    t.decimal  "min_lat",    precision: 9, scale: 6
    t.decimal  "min_long",   precision: 9, scale: 6
    t.decimal  "max_lat",    precision: 9, scale: 6
    t.decimal  "max_long",   precision: 9, scale: 6
    t.boolean  "is_active",                          default: false, null: false
  end

  create_table "ingress_mission_points", force: :cascade do |t|
    t.integer  "mission_id"
    t.integer  "point_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "action_type"
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
    t.string   "name",                                                      null: false
    t.integer  "agent_id"
    t.string   "mission_url",                                               null: false
    t.integer  "sequence_type",                             default: 0,     null: false
    t.integer  "series_type",                               default: 0,     null: false
    t.integer  "hidden_points",                             default: 0,     null: false
    t.integer  "mission_series_id"
    t.integer  "series_index"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "community_id"
    t.integer  "validation_level",                          default: 0,     null: false
    t.decimal  "min_lat",           precision: 9, scale: 6
    t.decimal  "min_long",          precision: 9, scale: 6
    t.decimal  "max_lat",           precision: 9, scale: 6
    t.decimal  "max_long",          precision: 9, scale: 6
    t.boolean  "is_active",                                 default: false, null: false
  end

  create_table "ingress_points", force: :cascade do |t|
    t.decimal  "lat",        precision: 9, scale: 6, null: false
    t.decimal  "long",       precision: 9, scale: 6, null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

  create_table "ingress_user_communities", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "community_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ingress_user_communities", ["community_id"], name: "index_ingress_user_communities_on_community_id", using: :btree
  add_index "ingress_user_communities", ["user_id"], name: "index_ingress_user_communities_on_user_id", using: :btree

  create_table "ingress_user_completed_missions", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "mission_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "ingress_user_completed_missions", ["mission_id"], name: "index_ingress_user_completed_missions_on_mission_id", using: :btree
  add_index "ingress_user_completed_missions", ["user_id"], name: "index_ingress_user_completed_missions_on_user_id", using: :btree

  create_table "translations", force: :cascade do |t|
    t.string   "locale"
    t.string   "key"
    t.text     "value"
    t.text     "interpolations"
    t.boolean  "is_proc",        default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "provider"
    t.string   "google_uid"
    t.string   "google_plus_link"
    t.integer  "roles",                  default: 0,  null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree

end
