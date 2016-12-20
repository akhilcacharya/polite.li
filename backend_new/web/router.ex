defmodule BackendNew.Router do
  use BackendNew.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", BackendNew do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    
    # Testing endpoints
    get "/all/users", APIController, :getAllUsers
    get "/all/prefs", APIController, :getAllPreferredContacts
    get "/all/contact", APIController, :getAllContactInformation
    get "/all/state", APIController, :getAllContactStates

    # GET Requests 
    get "/received",  APIController, :receivedConfirmation
    get "/api/self",  APIController, :getSelf
    get "/api/friends", APIController, :getFriends



  end

  # Other scopes may use custom stacks.
  # scope "/api", BackendNew do
  #   pipe_through :api
  # end
end
