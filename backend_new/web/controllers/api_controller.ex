defmodule BackendNew.APIController do
  use BackendNew.Web, :controller
  use HTTPotion.Base

  def index(conn, _params) do
      json conn, %{user: "Test"}
  end

  # Routes for testing purposes
  def get_all_users(conn, _params) do
      json conn, BackendNew.User |> BackendNew.Repo.all 
  end

  def get_all_preferred_contacts(conn, _params) do
      json conn, BackendNew.PreferredContact |> BackendNew.Repo.all 
  end

  def get_all_contact(conn, _params) do
      json conn, BackendNew.ContactInformation |> BackendNew.Repo.all 
  end

  def get_all_states(conn, _params) do
      json conn, BackendNew.ContactState |> BackendNew.Repo.all 
  end

  def received_confirmation(conn, _params) do
      text conn, "Received" 
  end



  def has_user(auth) do
      BackendNew.User
            |> where([u], u.auth_token == ^auth)
            |> BackendNew.Repo.all
            |> length > 0 
  end
    
  # Authenticated routes
  def get_self(conn,_param) do
    if !Map.has_key?(_param, "auth") do
        json conn, %{
            message: "Error: No token"
        }
    end
      
    auth = _param["auth"]

    # Top level user
    if !has_user(auth) do
        json conn, %{
            message: "Error: No user by token"
        }
    end  

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

  def get_friends(conn, _param) do  
    if !Map.has_key?(_param, "auth") do
        json conn, %{
            message: "Error: No token"
        }
    end
      
    auth = _param["auth"]

    # Top level user
    if !has_user(auth) do
        json conn, %{
            message: "Error: No user by token"
        }
    end    

    client = Tentacat.Client.new(%{access_token: auth})
    #me = Tentacat.Users.me(client)

    client |> Tentacat.Users.Followers.following |> IO.inspect


    json conn, %{friends: "Friends"}
  end 
end