/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import Select from 'react-select';
import 'react-select/dist/react-select.css';

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
            },
        };

        this.CONSTANTS = {
            FREE: 'FREE',
            BUSY: 'BUSY',
            EMERGENCIES: 'EMERGENCIES',
            DND: 'DND',
            CUSTOM: 'CUSTOM',
        }

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

    onChange(value){
        this.setState({
            selected: {
                value: value,
                custom: '',
            },
        }, () => {
            if(this.state.selected.value == this.CONSTANTS.CUSTOM) return;
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

        const contactOptions = [
            {
                value: 'PERSON', 
                label: '💁 In-Person'
            }, 
            {
                value: 'CELL', 
                label: '📞 Cell'
            }, 
            {
                value: 'SMS', 
                label: '📱 Text', 
            }, 
            {
                value: 'SKYPE', 
                label: ' Skype', 
            }, 
        ]; 

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
            <div className="padded-more">
                <div className="text-center">
                   <h1 className="title-header"> Polite.li </h1>
                   <h3> Can other people interrupt? </h3>
                </div>
                
                
                <Select autofocus
                        value={this.state.selected.value}
                        noResultsText="Custom Status"
                        onChange={this.onChange}
                        autosize={false}
                        searchable={true}
                        options={options} />

                <div className="text-center">
                   <h3> How? </h3>
                </div>

                <Select 
                        value={contactOptions[0]}
                        searchable={true}
                        options={contactOptions} />
                { this.state.selected.value == this.CONSTANTS.CUSTOM? customInput : ""  }

                <br/>
                <br/>


            </div>
        );
    }
}
