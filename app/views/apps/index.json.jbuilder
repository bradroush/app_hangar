json.array!(@apps) do |app|
  json.extract! app, :name
  json.url app_url(app, format: :json)
end
