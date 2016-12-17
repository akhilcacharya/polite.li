defmodule BackendNew.Repo.Migrations.CreateContactInformation do
  use Ecto.Migration

  def change do
    create table(:contact_information) do
      add :contact_mean, :string
      add :contact_value, :string
      add :user_id, references(:users, on_delete: :nothing)

      timestamps()
    end
    create index(:contact_information, [:user_id])

  end
end
