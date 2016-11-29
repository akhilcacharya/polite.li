/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
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

    openWindow(){
        console.log(ipc.sendSync('synchronous-message', ''));
    }

    render(){
        const groupItems = this.state.filteredUsers.map((user, idx) => {
            return (
                    <li key={idx} className="list-group-item">
                        <img className="img-circle media-object pull-left" src={'https://avatars.githubusercontent.com/' + user.username} width="64" height="64"/>
                        <div className="media-body">
                            <strong>{user.name}</strong>
                            <br/>
                            <strong>@{user.username}</strong>
                            <p>{user.state.value == 'CUSTOM'? user.state.custom: this.CONSTANTS[user.state.value]}
                            {user.state.value != 'DND'? <button className="btn pull-right btn-default" onClick={this.openWindow}>Contact</button> : <button className="btn pull-right btn-danger btn-disable">❌ Contact</button>}



                            </p>
                        </div>
                    </li>
            );
        });

        return (
            <div className="pane sidebar">
                <ul className="list-group" style={{overflow: 'auto'}}>
                    <li className="list-group-header">
                          <input
                            onChange={this.onType}
                            className="form-control"
                            type="text"
                            placeholder="Search for someone"/>
                     </li>
                    {groupItems}
                </ul>
            </div>
        );
    }


 }
