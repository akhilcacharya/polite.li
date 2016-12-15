defmodule PhoenixBackend.PageController do
  use PhoenixBackend.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
