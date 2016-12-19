defmodule BackendNew.PreferredContact do
  use BackendNew.Web, :model

  @derive {Poison.Encoder, only: [:id, :contact_mean, :user_id]}
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
    |> cast(params, [:contact_mean, :custom])
    |> validate_required([:contact_mean, :custom])
  end
end
