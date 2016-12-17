defmodule BackendNew.ContactInformationTest do
  use BackendNew.ModelCase

  alias BackendNew.ContactInformation

  @valid_attrs %{contact_mean: "some content", contact_value: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ContactInformation.changeset(%ContactInformation{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ContactInformation.changeset(%ContactInformation{}, @invalid_attrs)
    refute changeset.valid?
  end
end
