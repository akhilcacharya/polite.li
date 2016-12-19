defmodule BackendNew.Repo.Migrations.CreateContactState do
  use Ecto.Migration

  def change do
    create table(:contact_state) do
      add :contact_state, :string
      add :contact_custom, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:contact_state, [:user_id])

  end
end
