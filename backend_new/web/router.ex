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
    get "/all/users", APIController, :get_all_users
    get "/all/prefs", APIController, :get_all_preferred_contacts
    get "/all/contact", APIController, :get_all_contact
    get "/all/state", APIController, :get_all_states

    # GET Requests 
    get "/received",  APIController, :received_confirmation
    get "/api/self",  APIController, :get_self
    get "/api/friends", APIController, :get_friends



  end

  # Other scopes may use custom stacks.
  # scope "/api", BackendNew do
  #   pipe_through :api
  # end
end
