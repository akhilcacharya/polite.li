'use strict';

/**
 * polite-li backend.
 * Akhil Acharya
 * August 27, 2016
 */

const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const github = require('octonode');
const request = require('request');
const cors = require('cors');

const app = express();
app.server = http.createServer(app);

const config = require('./config.json');

var db_url = config.path + config.username + ":" + config.password +
    config.endpoint;

mongoose.connect(db_url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function() {
    console.log("Connected to remote MongoDB");
});

const UserSchema = mongoose.Schema({
    id: Number,
    username: String,
    name: String,
    auth_token: String,
    avatar: String,
    state: {
        value: String,
        custom: String,
    },
});

mongoose.model("User", UserSchema);


app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get("/login", (req, res) => {
    res.render('index', {client_id: config.gh_client_id});
});

app.get('/auth', (req, res) => {
    const auth = req.query.code;

    const options = {
        method: 'post',
        url: 'https://github.com/login/oauth/access_token',
        json: true,
        body: {
            client_id: config.gh_client_id,
            client_secret: config.gh_client_secret,
            code: auth,
        },
    };

    request(options, (err, resp, body) => {
        if(err){
            res.status(401).json({
                message: 'Error validating auth code',
            });
            return;
        }

        const token = body.access_token;
        var client = github.client(token);

        client.get('/user', {}, function (err, status, body, headers) {
            const login = body.login; 
            const name = body.name == null? "":body.name; 
            const id = body.id; 
            const avatar = body.avatar; 

            const User = mongoose.model("User");

            User.find({id: id}, (err, users) => {
                if(users.length > 0){
                    const newUser = users[0];
                    //Update the token
                    newUser.auth_token = token;
                    newUser.save(() => {
                        console.log("Already exists, new auth token", newUser.auth_token);
                        res.redirect('/received?token=' + token);
                    });
                } else {
                     const newUser = new User({
                        id: id,
                        username: login,
                        name: name,
                        auth_token: token,
                        avatar: avatar,
                        state: {
                            value: 'FREE',
                            custom: '',
                        },
                    });

                    newUser.save(() => {
                        console.log("User saved");
                        res.redirect('/received?token=' + newUser.auth_token);
                    });
                }
            });
        });
    });
});

app.get('/received', (req, res) => {
    res.status(200).send();
});

app.post("/api/sync", (req, res) => {
    const body = req.body;
    const token = body.auth;

    const User = mongoose.model("User");
    User.findOne({auth_token: token}, (err, user) => {
        if(err || !user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        user.state = {
            value: body.state.selected.value,
            custom: body.state.selected.custom,
        };

        user.save(() => {
            res.status(200).json({message: "Success"});
        });
    });
});

app.get("/api/self", (req, res) => {
    const token = req.query.token;
    const User = mongoose.model("User");
    User.findOne({auth_token: token}, (err, user) => {
        if(err || !user){
            res.status(401).json({message: "Unauthorized"});
            return;
        }
        res.status(200).json({user: user, message: "Success"});
    });
});


app.get('/api/friends', (req, res) => {
    const token = req.query.token;

    const client = github.client(token);
    const me = client.me();

    const User = mongoose.model("User");

    me.following((err, followers) => {
        if(err){
            res.status(401).json({message: "Unauthorized"});
            return;
        }

        const ids = followers.map((follower) => follower.id)

        User.find({'id': {
            $in: ids,
        }}, (err, users) => {
            if(err || !users){
                res.status(401).json({message: "Error fetching"});
                return;
            }
            res.status(200).json({users: users, message: "Success"});
         });
    });
});


const port = 3000;
app.server.listen(port, () => console.log("Listening on port " + port));


module.exports = app;
