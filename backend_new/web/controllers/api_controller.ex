defmodule BackendNew.APIController do
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

  def getAllContactStates(conn, _params) do
      json conn, BackendNew.ContactState |> BackendNew.Repo.all 
  end

  def receivedConfirmation(conn, _params) do
      text conn, "Received" 
  end

  # Authenticated routes
  def getSelf(conn, %{"auth" => auth}) do
      # TODO: Error checking
    
      # Top level user
      user = BackendNew.User
                |> where([u], u.auth_token == ^auth)
                |> BackendNew.Repo.all  
                |> hd
                

      # Top level user state
      state = BackendNew.ContactState 
                |> where([c], c.user_id == ^user.id)
                |> BackendNew.Repo.all
                |> hd
      
      # Current contact methods (a list)
      contact = BackendNew.PreferredContact
                |> where([c], c.user_id == ^user.id)
                |> BackendNew.Repo.all

      result = %{
          user: user, 
          state: state, 
          contact: contact, 
      }

      json conn, result
  end

  def getFriends(conn, %{"auth" => auth}) do  
      client = Tentacat.Client.new(%{access_token: auth})
      me = Tentacat.Users.me(client)
      json conn, %{friends: "Friends"}
  end 
end