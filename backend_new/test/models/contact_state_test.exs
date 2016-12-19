defmodule BackendNew.ContactStateTest do
  use BackendNew.ModelCase

  alias BackendNew.ContactState

  @valid_attrs %{contact_custom: "some content", contact_state: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ContactState.changeset(%ContactState{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ContactState.changeset(%ContactState{}, @invalid_attrs)
    refute changeset.valid?
  end
end
