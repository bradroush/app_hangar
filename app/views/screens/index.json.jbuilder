json.array!(@screens) do |screen|
  json.extract! screen, :name, :app_id
  json.url screen_url(screen, format: :json)
end
