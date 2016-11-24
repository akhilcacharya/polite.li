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
 
const Contact = ({integrations, onFinish}) => {
      let information = {}; 
      integrations.forEach((i) => information[i] = ''); 
      const contacts = integrations.map((integration, idx) => (
            <div className="row" key={idx}> 
                <span className="col-xs-8 pull-left">{integration}</span>
                <input onChange={(e) => (information[integration] = e.target.value)} className="form-control"/>
            </div>
      )); 

      return (
            <div className="input-group container">
                {contacts}
                <button onClick={() => onFinish(information)} className="btn btn-primary">Submit</button>
            </div>
      ); 
}; 

export default Contact; 