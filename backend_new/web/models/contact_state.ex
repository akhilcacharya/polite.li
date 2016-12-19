defmodule BackendNew.ContactState do
  use BackendNew.Web, :model

  schema "contact_state" do
    field :contact_state, :string
    field :contact_custom, :string
    belongs_to :user, BackendNew.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:contact_state, :contact_custom])
    |> validate_required([:contact_state, :contact_custom])
  end
end
