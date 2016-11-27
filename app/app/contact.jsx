/** 
 * Contact.jsx 
 * Stateless component to show a list of the possible contact information to add.  
 * Example:  
 * <ContactInfo integrations={["Cell", "Text", "Skype", "Slack"]} onFinish={(information) => {
 *      console.log(information); 
 *  }}/>
 */

import React from "react";

require('../index.scss');

export default class Contact extends React.Component {
      constructor(props){
            super(props); 
            this.state = {
                  auth: props.auth, 
                  syncURL: props.syncURL, 
                  integrations: props.integrations,
                  information: {}, 
            }
      }

      componentDidMount(){
            fetch(this.state.syncURL + '?token=' + this.state.auth, {
                  method: 'get',
                  mode: 'cors',
            }).then((res) => res.json()).then((data) => {
                  //TODO: Rename to something more sensible
                  const transform = {}; 
                  data.prefs.integration.forEach((i) => {
                        transform[i.name] = {
                              name: i.name, 
                              value: i.value, 
                        }; 
                  });
                  this.setState({
                        ...this.state, 
                        information: transform,  
                  });
            });
      }

      componentWillUnmount(){
            //Call the API
            const integrations = Object.keys(this.state.information).map((key) => {
                  return this.state.information[key]; 
            }); 

            fetch(this.state.syncURL, {
                  method: 'post',
                  headers: {
                        "Content-type": "application/json; charset=UTF-8"
                  },
                  mode: 'cors',
                  body: JSON.stringify({
                        auth: this.state.auth,
                        prefs: integrations, 
                  }),
            });
      }

      render() {     
            if(Object.keys(this.state.information).length == 0){
                  this.state.integrations.forEach((i) => this.state.information[i] = {name: i, value: ''}); 
            }
      
            const contacts = this.state.integrations.map((integration, idx) => (
                  <div className="row" key={idx}> 
                        <span className="col-xs-8 pull-left">
                              {integration}{this.state.information[integration].value}
                        </span>
                        <input 
                              type="text"
                              onChange={(e) => {
                                    this.state.information[integration].value = e.target.value;
                                    this.setState({
                                          ...this.state, 
                                    });
                              }} 
                              value={this.state.information[integration].value} 
                              className="form-control"/>
                  </div>
            )); 

            return (
                  <div className="input-group container">
                        <div style={{marginLeft: 30, marginRight: 30, overflow: 'auto', maxHeight: 200}} >
                              {contacts}
                        </div>
                  </div>
            ); 
      }
}