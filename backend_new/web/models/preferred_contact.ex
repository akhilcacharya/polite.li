defmodule BackendNew.PreferredContact do
  use BackendNew.Web, :model

  schema "preferred_contact" do
    field :contact_mean, :string
    belongs_to :user, BackendNew.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:contact_mean])
    |> validate_required([:contact_mean])
  end
end
