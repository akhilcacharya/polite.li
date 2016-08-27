import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";

require('../index.scss');

export default class FriendPane extends React.Component {
    constructor(){
        super(); 
        //Get friends from REST API
        //Filter from the search box
    }

    render(){

        const users = [
            {
                name: "Akhil Acharya", 
                username: "akhilcacharya", 
                img: "https://avatars0.githubusercontent.com/u/3621384?v=3&s=460", 
            }
        ]; 

        const groupItems = users.map((user, idx) => {
            return (
                <div>
                    <li className="list-group-item" key={idx}>
                        <img className="img-circle media-object pull-left" src={user.img} width="48" height="48"/>
                        <div className="media-body pull-left">
                            <h4>{user.name}</h4>
                            <h5>@{user.username}</h5>
                        </div>
                    </li>
                <hr/>
                </div>
            ); 
        }); 

        return (
            <div className="text-center">
                <ul className="list-group">
                    <li className="list-group-header">
                        <input className="form-control" type="text" placeholder="Search for someone"/>
                    </li>
                    <hr/>
                    {groupItems}
                </ul>
            </div>
        ); 
    }
}