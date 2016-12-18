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
    get "/all/users", UserController, :getAllUsers
    get "/all/prefs", UserController, :getAllPreferredContacts
    get "/all/contact", UserController, :getAllContactInformation

    # GET Requests 
    get "/received",  UserController, :receivedConfirmation
    get "/api/prefs", UserController, :getPrefs
    get "/api/self",  UserController, :getSelf
    get "/api/friends", UserController, :getFriends



  end

  # Other scopes may use custom stacks.
  # scope "/api", BackendNew do
  #   pipe_through :api
  # end
end
