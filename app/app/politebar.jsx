/* @flow */

import React from "react";
import ReactDom from "react-dom";
import { Pane } from "react-photonkit";
import Select from 'react-select';

import { STATUS, STATUS_DESCRIPTIONS, CONTACTS } from './common/constants.js';

import 'react-select/dist/react-select.css';

import ContactInfo from './contact.jsx';

require('../index.scss');

const ContactOption = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		className: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		isFocused: React.PropTypes.bool,
		isSelected: React.PropTypes.bool,
		onFocus: React.PropTypes.func,
		onSelect: React.PropTypes.func,
		option: React.PropTypes.object.isRequired,
	},
	handleMouseDown (event) {
		// event.preventDefault();
		// event.stopPropagation();
		// this.props.onSelect(this.props.option, event);
	},
	handleMouseEnter (event) {
		// this.props.onFocus(this.props.option, event);
	},
	handleMouseMove (event) {
		// if (this.props.isFocused) return;
		// this.props.onFocus(this.props.option, event);
	},
	render () {
		let gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className={this.props.className}
				onMouseDown={this.handleMouseDown}
				onMouseEnter={this.handleMouseEnter}
				onMouseMove={this.handleMouseMove}
				title={this.props.option.title}>
				<img src={this.props.option.icon} height={32} width={32} style={gravatarStyle} />
                {this.props.option.label}
			</div>
		);
	}
});


const ContactValue = React.createClass({
	propTypes: {
		children: React.PropTypes.node,
		placeholder: React.PropTypes.string,
		value: React.PropTypes.object
	},
	render () {
		var gravatarStyle = {
			borderRadius: 3,
			display: 'inline-block',
			marginRight: 10,
			position: 'relative',
			top: -2,
			verticalAlign: 'middle',
		};
		return (
			<div className="Select-value" title={this.props.value.title}>
				<span className="Select-value-label">
					<img src={this.props.value.icon} height={32} width={32} style={gravatarStyle} />
					<p> {JSON.stringify(this.props)} </p>
                    {this.props.children}
				</span>
			</div>
		);
	}
});


export default class PoliteBarPane extends React.Component {
    constructor(props){
        super(props);
        this.auth = props.auth;
        this.syncURL = props.syncURL;
        this.fetchURL = props.fetchURL + "?token=" + this.auth;

        this.state = {
            name: '',
            username: '',
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
                <div className="input-group" style={{marginLeft: 10, marginRight: 10}}>
                    <h4> Custom Status: </h4>
                    <input defaultValue={this.state.selected.custom}
                           onBlur={this.onBlurred}
                           placeholder="Custom Status"
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
                            valueComponent={ContactOption}
                            style={{margin:5}}
                            options={CONTACTS}
                            optionComponent={ContactOption} 
                            onChange={(contact) => this.onChange({contact: contact})}/>
                </div>
                        { this.state.selected.value == STATUS.CUSTOM? customInput : ""  }
                <br/>
            </div>
        );
    }
}
