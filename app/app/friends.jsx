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

        this.onType = this.onType.bind(this);
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


    render(){
        const groupItems = this.state.filteredUsers.map((user, idx) => {
            return (
                    <li key={idx} className="list-group-item card-1">
                        <img className="pull-left" src={user.avatar} width="72" height="72"/>
                        <div className="card-body text-left">
                          <div className="text-left" style={{marginLeft: 5}}>
                            <h5><b>{user.name}</b></h5>
                            <h5>@{user.username}</h5>
                              <h5>{user.state.value == 'CUSTOM'? user.state.custom: this.CONSTANTS[user.state.value]}</h5>
                          </div>

                        </div>
                    </li>
            );
        });

        return (
            <div className="text-center">
                <input
                    onChange={this.onType}
                    className="form-control search-box"
                    type="text"
                    placeholder="Search for someone"/>
                <br/>
                <ul className="list-group" style={{overflow: 'auto', maxHeight: 246}}>
                      {groupItems}

                </ul>
            </div>
        );
    }
}
