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

ActiveRecord::Schema.define(version: 20130913063919) do

  create_table "apps", force: true do |t|
    t.string   "name"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "screens", force: true do |t|
    t.string   "name"
    t.integer  "app_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "screens", ["app_id"], name: "index_screens_on_app_id"

  create_table "views", force: true do |t|
    t.string   "background_color"
    t.integer  "origin_x"
    t.integer  "origin_y"
    t.integer  "width"
    t.integer  "height"
    t.integer  "screen_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "views", ["screen_id"], name: "index_views_on_screen_id"

end
