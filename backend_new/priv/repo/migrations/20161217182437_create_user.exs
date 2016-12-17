defmodule BackendNew.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :username, :string
      add :name, :string
      add :auth_token, :string
      add :github_id, :string

      timestamps()
    end

  end
end
