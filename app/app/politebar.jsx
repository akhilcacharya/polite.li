import React from "react";
import { Pane } from "react-photonkit";

export default class PoliteBarPane extends React.Component {
    constructor(){
        super(); 
    }

    render(){
        return (
            <Pane className="padded-more text-center">
                <h2> Hello PoliteBar! </h2>
            </Pane>
        ); 
    }
}