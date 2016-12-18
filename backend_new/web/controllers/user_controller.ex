defmodule BackendNew.UserController do
  use BackendNew.Web, :controller
  use HTTPotion.Base

  def index(conn, _params) do
      json conn, %{user: "Test"}
  end

  # Routes for testing purposes
  def getAllUsers(conn, _params) do
      json conn, BackendNew.User |> BackendNew.Repo.all 
  end

  def getAllPreferredContacts(conn, _params) do
      json conn, BackendNew.PreferredContact |> BackendNew.Repo.all 
  end

  def getAllContactInformation(conn, _params) do
      json conn, BackendNew.ContactInformation |> BackendNew.Repo.all 
  end


  def getPrefs(conn, %{"auth" => id}) do
      json conn, %{prefs: "Test"}
  end

  def getSelf(conn, %{"auth" => id}) do
      json conn, %{self: "Test"}
  end

  def getFriends(conn, %{"auth" => id}) do
      json conn, %{friends: "Friends"}
  end 
end
