/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import Select from 'react-select';

import { STATUS, STATUS_DESCRIPTIONS, CONTACTS } from './common/constants.js'; 

import 'react-select/dist/react-select.css';

import ContactInfo from './contact.jsx'; 


require('../index.scss');

export default class PoliteBarPane extends React.Component {
    constructor(props){
        super(props);
        this.auth = props.auth;
        this.syncURL = props.syncURL;
        this.fetchURL = props.fetchURL + "?token=" + this.auth;
        
        this.state = {
            selected: {
                value: '',
                custom: '',
                contact: '', 
            },
        };

        this.onChange = this.onChange.bind(this);
        this.onBlurred = this.onBlurred.bind(this);
        this.syncState = this.syncState.bind(this);
    }

    componentDidMount(){
        fetch(this.fetchURL, {
            method: 'get',
            mode: 'cors',
        }).then((res) => res.json()).then((data) => {
            this.setState({
                selected: {
                    ...data.user.state,
                }
            });
        }).catch((err) => {
            console.warn(err); 
        });
    }

    onChange({contact, status}){
        if(!contact) contact = this.state.selected.contact; 
        if(!status)  status = this.state.selected.value; 
        this.setState({
            selected: {
                value: status,
                custom: '',
                contact: contact, 
            },
        }, () => {
            if(this.state.selected.value == STATUS.CUSTOM) return;
            this.syncState();
        });
    }

    onBlurred(evt){
        const custom = evt.target.value;
        const state = this.state;
        this.setState({
            selected: {
                value: state.selected.value,
                custom: custom,
                contact: state.selected.contact, 
            },
          }, () => {
            this.syncState()
        });
    }

    syncState(){
        const auth = this.auth;
        const state = this.state;
        fetch(this.syncURL, {
            method: 'post',
            headers: {
                 "Content-type": "application/json; charset=UTF-8"
            },
            mode: 'cors',
            body: JSON.stringify({
                auth: auth,
                state: state
            }),
        });
    }

    render(){
        const customInput = (
                <div className="input-group">
                    <input defaultValue={this.state.selected.custom}
                           onBlur={this.onBlurred}
                           placeholder="Custom Status"
                           type="text"
                           className="form-control"/>
                </div>
        );

        return (
            <div className="pane main-pane">
                
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                
                <div className="text-center">
                   <h3> Can other people interrupt? </h3>
                </div>
                                
                <Select autofocus
                        value={this.state.selected.value}
                        noResultsText="Custom Status"
                        onChange={(status) => this.onChange({status: status})}
                        autosize={false}
                        searchable={true}
                        options={STATUS_DESCRIPTIONS} />

                <div className="text-center">
                   <h3> How? </h3>
                </div>

                <Select 
                        value={this.state.selected.contact}
                        searchable={true}
                        onChange={(contact) => this.onChange({contact: contact})}
                        options={CONTACTS} />

                <br/>
                
                { this.state.selected.value == STATUS.CUSTOM? customInput : ""  }
                
                <br/>
            </div>
        );
    }
}
