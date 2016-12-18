mix ecto.drop
mix ecto.create
mix ecto.migrate

# Re-seed the data
# TODO: re-seed it from a serialized state
mix run priv/repo/seeds.exs 