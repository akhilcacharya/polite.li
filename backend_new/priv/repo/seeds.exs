# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     BackendNew.Repo.insert!(%BackendNew.SomeModel{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# Delete all old data 
# REMOVE BEFORE PRODUCTION
# Perhaps create a test DB?
BackendNew.PreferredContact |> BackendNew.Repo.delete_all
BackendNew.ContactInformation |> BackendNew.Repo.delete_all
BackendNew.User |> BackendNew.Repo.delete_all

# Test data
BackendNew.Repo.insert!(
    %BackendNew.User{
        id: 1, 
        username: "AkhilCAcharya", 
        name: "Akhil Acharya", 
        auth_token: "1234", 
        github_id: "3456"
    }
)

BackendNew.Repo.insert!(
    %BackendNew.User{
        id: 2, 
        username: "BarackObama", 
        name: "Barack Obama", 
        auth_token: "3456", 
        github_id: "78910"
    }
)


BackendNew.Repo.insert!(
    %BackendNew.ContactInformation{
        contact_mean: "SLACK", 
        contact_value: "akhilcacharya", 
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.ContactInformation{
        contact_mean: "SMS", 
        contact_value: "9197201133", 
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.ContactInformation{
        contact_mean: "PHONE", 
        contact_value: "9197201133", 
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.PreferredContact{
        contact_mean: "PHONE",
        contact_value: "9197201133", 
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.PreferredContact{
        contact_mean: "SMS",
        contact_value: "9197201133", 
        user_id: 2, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.ContactState{
        contact_state: "DND",
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.ContactState{
        contact_state: "DND",
        user_id: 1, 
    }
)

BackendNew.Repo.insert!(
    %BackendNew.ContactState{
        contact_state: "BUSY",
        user_id: 2, 
    }
)