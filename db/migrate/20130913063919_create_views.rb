class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|
      t.string :background_color
      t.integer :origin_x
      t.integer :origin_y
      t.integer :width
      t.integer :height
      t.references :screen, index: true

      t.timestamps
    end
  end
end
