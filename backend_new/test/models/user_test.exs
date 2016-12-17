defmodule BackendNew.UserTest do
  use BackendNew.ModelCase

  alias BackendNew.User

  @valid_attrs %{auth_token: "some content", github_id: "some content", name: "some content", username: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = User.changeset(%User{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = User.changeset(%User{}, @invalid_attrs)
    refute changeset.valid?
  end
end
