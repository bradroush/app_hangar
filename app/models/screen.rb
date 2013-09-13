class Screen < ActiveRecord::Base
  belongs_to :app
  has_many :views
end
