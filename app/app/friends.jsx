/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import _ from 'lodash';

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

    render(){

        const onType = (event) => {
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
            })
        };

        const groupItems = this.state.filteredUsers.map((user, idx) => {
            return (
                <div key={idx}>
                    <li className="card card-1">
                        <img className="pull-left" src={user.avatar} width="72" height="72"/>
                        <div className="card-body pull-left">
                            <h4><b>{user.name}</b></h4>
                            <h5>@{user.username}</h5>
                            <h5>{user.state.value == 'CUSTOM'? user.state.custom: this.CONSTANTS[user.state.value]}</h5>
                        </div>
                    </li>
                </div>
            );
        });

        return (
            <div className="text-center">
                <ul className="list-group">
                    <li className="list-group-header">
                        <input onChange={onType} className="form-control" type="text" placeholder="Search for someone"/>
                    </li>
                    {groupItems}
                </ul>
            </div>
        );
    }
}
