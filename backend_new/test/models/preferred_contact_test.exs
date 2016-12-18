defmodule BackendNew.PreferredContactTest do
  use BackendNew.ModelCase

  alias BackendNew.PreferredContact

  @valid_attrs %{contact_mean: "some content", custom: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = PreferredContact.changeset(%PreferredContact{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = PreferredContact.changeset(%PreferredContact{}, @invalid_attrs)
    refute changeset.valid?
  end
end
