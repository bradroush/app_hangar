namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do

    # bundle exec rake db:reset
    # bundle exec rake db:migrate
    # bundle exec rake db:populate

    # Create the test app
    app = App.new
    app.name = "Test"
    app.save

    # Create the first Screen
    home_screen = Screen.new
    home_screen.name = "Home"
    home_screen.app = app
    home_screen.save

    # Create the second Screen
    detail_screen = Screen.new
    detail_screen.name = "Detail"
    detail_screen.app = app
    detail_screen.save

  end
end