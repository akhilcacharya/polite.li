# Schema 


```

const UserSchema = mongoose.Schema({
    
    id: Number,
    
    username: String,
    
    name: String,
    
    auth_token: String,
    
    avatar: String,
    
    state: {                //Separate table?
        value: String,
        custom: String,
        contact: String,
    },
    
    prefs: {                //Separate table?
        integration: [],
    },
});


```

# Web Docs 

``/login``

Renders the index page

``/auth``

Query Param: code

Redirects to the logged in page

# API Docs

# GET 



``/received``

Sends back a 200 for confirmation

``/api/prefs``

Get the current prefs for a particular token. *IGNORE FOR THE MOMENT*

``/api/self`` 

Get the current user per token. 

``/api/friends`` 

Get friends for a particular token


# POST 

``/api/sync``

Sync the current state

``/api/prefs``

Sync local preferences by token 
