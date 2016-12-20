defmodule BackendNew.Repo.Migrations.CreatePreferredContact do
  use Ecto.Migration

  def change do
    create table(:preferred_contact) do
      add :contact_mean, :string
      add :contact_value, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:preferred_contact, [:user_id])

  end
end
