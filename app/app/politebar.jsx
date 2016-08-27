import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import Select from 'react-select';

import 'react-select/dist/react-select.css';

require('../index.scss');


export default class PoliteBarPane extends React.Component {
    
    constructor(props){
        super(props); 
        this.url = props.url; 
        this.auth = props.auth; 
        if(Object.keys(props.state).length == 0){
            this.state = {
                selected: {
                    value: '', 
                    custom: '', 
                }, 
            };  
        }else{
            this.state = {...props.state}; 
        }

        this.CONSTANTS = {
            FREE: 'FREE', 
            BUSY: 'BUSY', 
            EMERGENCIES: 'EMERGENCIES', 
            DND: 'DND', 
            CUSTOM: 'CUSTOM', 
        }

        this.onChange = this.onChange.bind(this); 
        this.syncState = this.syncState.bind(this); 
    }

    onChange(value){
        this.setState({
            selected: {
                value: value,  
            }, 
        }, () => {
            if(this.state.selected.value == this.CONSTANTS.CUSTOM) return;
            this.syncState(); 
        }); 
    }

    syncState(){
        fetch(this.url, {
            method: 'post', 
            body: JSON.stringify({
                auth: this.auth, 
                state: this.state
            }), 
        }); 
    }


    render(){
        const options = [
            {
                value: this.CONSTANTS.FREE, 
                label: '😀  Anytime!' 
            }, 
            {
                value: this.CONSTANTS.BUSY, 
                label: '😓  Later. Super busy.'
            }, 
            {
                value: this.CONSTANTS.EMERGENCIES, 
                label: '🚒  Only for Emergencies'
            },
            {
                value: this.CONSTANTS.DND, 
                label: '🚫 Do Not Disturb'
            }, 
            {
                value: this.CONSTANTS.CUSTOM, 
                label: '❓ Custom'
            }
        ]; 

        const customInput = (
                <div className="input-group">
                    <input onBlur={this.syncState} placeholder="Custom Status" type="text" className="form-control"/>
                </div>
        ); 

        return (
            <div className="padded-more">
                <div className="text-center">
                   <h1 className="title-header"> Polite.li </h1>
                   <h3> Can other people interrupt? </h3>
                </div>
                <Select autofocus value={this.state.selected.value} noResultsText="Custom Status" onChange={this.onChange} autosize={false} searchable={true} options={options} />
                <br/>
                { this.state.selected.value == this.CONSTANTS.CUSTOM? customInput : ""  }
                <br/>
            </div>
        ); 
    }
}