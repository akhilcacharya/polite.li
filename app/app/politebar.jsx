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
            name: '',
            username: '',
            msg: '', 
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
                name: data.user.name,
                username: data.user.username,
                selected: {
                    ...data.user.state,
                }
            });
        }).catch((err) => {
            console.warn(err);
            this.setState({
                ...this.state, 
                msg: '❗ Error fetching data' 
            }); 

            setTimeout(() => {
                this.setState({
                    ...this.state, 
                    msg: '', 
                }); 
            }, 1200); 

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
        }).then(() => {
            this.setState({
                ...this.state, 
                msg: '✔ Synced!' 
            })

            setTimeout(() => {
                this.setState({
                    ...this.state, 
                    msg: '', 
                }); 
            }, 2000); 

        });
    }

    render(){
        const customInput = (
                <div className="input-group" style={{marginLeft: 10, marginRight: 10}}>
                    <h4> Custom Status: </h4>
                    <input defaultValue={this.state.selected.custom}
                           onBlur={this.onBlurred}
                           type="text"
                           className="form-control"/>
                </div>
        );

        return (
            <div className="pane pagination-centered main-pane" style={{overflow: 'hidden'}}>
                <br/>
                <br/>
                <div className="text-center">
                    <img className="img-circle media-object" src={'https://avatars.githubusercontent.com/' + this.state.username} width="128" height="128"/>
                </div>
                                                           
                <div className="text-center" style={{marginTop: -20}}>
                    <h4> {this.state.name} </h4>
                </div>
                <div className="text-center" style={{marginTop: -20}}>
                    <h4>  @{this.state.username} </h4>
                </div>

                <div className="text-center">
                   <h3> Can other people interrupt? </h3>
                </div>

                <div className="selectPane">
                    <Select autofocus
                            value={this.state.selected.value}
                            noResultsText="Custom Status"
                            onChange={(status) => this.onChange({status: status})}
                            autosize={false}
                            style={{margin:5}}
                            searchable={true}
                            options={STATUS_DESCRIPTIONS} />
                </div>

                <div className="text-center">
                   <h3> How? </h3>
                </div>
                
                <div className="selectPane">
                    <Select
                            value={this.state.selected.contact}
                            searchable={true}
                            style={{margin:5}}
                            onChange={(contact) => this.onChange({contact: contact})}
                            options={CONTACTS} />
                </div>
                { this.state.selected.value == STATUS.CUSTOM? customInput : ""  }
                <br/>
                <p className="text-center">  {this.state.msg}</p>

            </div>
        );
    }
}
