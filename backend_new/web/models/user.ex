defmodule BackendNew.User do
  use BackendNew.Web, :model 

  @derive {Poison.Encoder, only: [:username, :name, :auth_token, :github_id]}
  schema "users" do
    field :username, :string
    field :name, :string
    field :auth_token, :string
    field :github_id, :string
    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:username, :name, :auth_token, :github_id])
    |> validate_required([:username, :name, :auth_token, :github_id])
  end
end
