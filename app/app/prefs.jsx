/**
 * Component for user preferences
 * Includes the contact-means view as well. 
 */

import React from 'react'; 
import ContactInfo from './contact.jsx'; 
import { INTEGRATIONS } from './common/constants.js'


const PreferencePane = (props) => (
        <div>
            <ContactInfo {...props} integrations={INTEGRATIONS} />
        </div>
); 

export default PreferencePane; 