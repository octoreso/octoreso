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

ActiveRecord::Schema.define(version: 20160202213006) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ingress_agents", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "ingress_communities", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
    t.decimal  "min_lat",    precision: 9, scale: 6
    t.decimal  "min_long",   precision: 9, scale: 6
    t.decimal  "max_lat",    precision: 9, scale: 6
    t.decimal  "max_long",   precision: 9, scale: 6
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
    t.string   "name",                                                  null: false
    t.integer  "agent_id",                                              null: false
    t.string   "mission_url",                                           null: false
    t.integer  "sequence_type",                                         null: false
    t.integer  "series_type",                                           null: false
    t.integer  "mission_series_id"
    t.integer  "series_index"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "community_id"
    t.integer  "validation_level",                          default: 0, null: false
    t.decimal  "min_lat",           precision: 9, scale: 6
    t.decimal  "min_long",          precision: 9, scale: 6
    t.decimal  "max_lat",           precision: 9, scale: 6
    t.decimal  "max_long",          precision: 9, scale: 6
  end

  create_table "ingress_points", force: :cascade do |t|
    t.decimal  "lat",        precision: 9, scale: 6, null: false
    t.decimal  "long",       precision: 9, scale: 6, null: false
    t.datetime "created_at",                         null: false
    t.datetime "updated_at",                         null: false
  end

end
