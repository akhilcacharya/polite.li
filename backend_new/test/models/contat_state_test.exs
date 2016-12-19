defmodule BackendNew.ContatStateTest do
  use BackendNew.ModelCase

  alias BackendNew.ContatState

  @valid_attrs %{contact_state: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = ContatState.changeset(%ContatState{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = ContatState.changeset(%ContatState{}, @invalid_attrs)
    refute changeset.valid?
  end
end
