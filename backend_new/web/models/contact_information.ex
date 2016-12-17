defmodule BackendNew.ContactInformation do
  use BackendNew.Web, :model

  schema "contact_information" do
    field :contact_mean, :string
    field :contact_value, :string
    belongs_to :user, BackendNew.User

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:contact_mean, :contact_value])
    |> validate_required([:contact_mean, :contact_value])
  end
end
