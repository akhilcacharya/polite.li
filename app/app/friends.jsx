import React from "react";
import { Pane } from "react-photonkit";

export default class FriendPane extends React.Component {
    constructor(){
        super(); 
    }

    render(){
        return (
            <Pane className="padded-more text-center">
                <h1> Hello! </h1>
            </Pane>
        ); 
    }
}