/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import {emojiForContact} from './common/constants.js';
import _ from 'lodash';

const ipc = window.require('electron').ipcRenderer;


require('../index.scss');

export default class FriendPane extends React.Component {
    constructor(props){
        super(props);
        //Get friends from REST API
        //Filter from the search box
        this.auth = props.auth;
        this.url = props.friendURL;
        this.url += '?token=' + this.auth;

        this.state = {
            users: [],
            filteredUsers: [],
        };

        this.CONSTANTS = {
            'FREE': '😀  Anytime!',
            'BUSY': '😓  Later. Super busy.',
            'EMERGENCIES': '🚒  Only for Emergencies',
            'DND': '🚫 Do Not Disturb',
            'CUSTOM': '❓ Custom'
        };

        this.onType = this.onType.bind(this);
        this.openWindow = this.openWindow.bind(this);
    }

    componentDidMount(){
        fetch(this.url, {
            method: 'get',
            mode: 'cors',
        }).then((res) => res.json()).then((data) => {
            this.setState({
                users: data.users,
                filteredUsers: data.users.slice(),
            });
        });
    }

    onType(event){
        let value = event.target.value;
        if(value == ''){
            this.setState({
                ...this.state,
                filteredUsers: this.state.users.slice(),
            })
            return;
        }

        value = value.toLowerCase();

        const filteredUsers = this.state.users.filter((user) => {
            return user.name.toLowerCase().indexOf(value) > -1 || user.username.toLowerCase().indexOf(value) > -1 || this.CONSTANTS[user.state.value].toLowerCase().indexOf(value) > -1;
        });

        this.setState({
            ...this.state,
            filteredUsers: filteredUsers,
        });
    }

    openWindow(s){
        console.log(s);
        if(s == "SMS")
            console.log(ipc.sendSync('open', 'open -a Messages'));
        if(s == "CELL")
            console.log(ipc.sendSync('open', 'open -a Contacts'));
        if(s == "SLACK")
            console.log(ipc.sendSync('open', 'open -a Slack'));
        if(s == "EMAIL")
            console.log(ipc.sendSync('open', 'open -a mail'));

    }

    render(){
       // console.log(this.state.filteredUsers.map(user => user.name)); 
        this.state.filteredUsers.sort((a, b) => {
            return a.name > b.name? 1: -1; 
        }); 
        console.log(this.state.filteredUsers.map(user => user.name)); 

        const groupItems = this.state.filteredUsers.map((user, idx) => {
            return (
                    <li key={idx} className="list-group-item">
                        <img className="img-circle media-object pull-left" src={'https://avatars.githubusercontent.com/' + user.username} width="64" height="64"/>
                        <div className="media-body">
                            <h4><strong>{user.name} </strong></h4>
                            
                            <h5><strong>@{user.username}</strong></h5>
                            <h5>{user.state.value == 'CUSTOM'? user.state.custom: this.CONSTANTS[user.state.value]}
                            {user.state.value != 'DND' && user.state.contact != 'PERSON' ? <button className="btn pull-right btn-default button" onClick={() => this.openWindow(user.state.contact)}> <img className = "contact-icon" src={"../assets/"+user.state.contact+".png"}/> </button> : <button className={user.state.contact === 'PERSON' ? "btn btn-primary pull-right btn-disable" : "btn pull-right btn-danger btn-disable"}> {user.state.contact === 'PERSON' ? 'In Person' : 'Not Available'} </button>}

                            </h5>
                        </div>
                    </li>
            );
        });

        return (
            <div className="pane sidebar side-pane" style={{marginTop: 20}}>
                <ul className="list-group" style={{overflow: 'auto'}}>
                    <li className="list-group-header">
                          <input
                            onChange={this.onType}
                            className="form-control"
                            type="text"
                            placeholder={"🔎 Search"}/>
                     </li>
                    {groupItems}
                </ul>
            </div>
        );
    }


 }
