/**
 *  Store all relevant text constants
 */
//Status Constants
const STATUS = {
  FREE: 'FREE',
  BUSY: 'BUSY',
  EMERGENCIES: 'EMERGENCIES',
  DND: 'DND',
  CUSTOM: 'CUSTOM',
};

const STATUS_DESCRIPTIONS = [
  {value: STATUS.FREE, label: '😀  Anytime!'},
  {value: STATUS.BUSY, label: '😓  Later. Super busy.'},
  {value: STATUS.EMERGENCIES, label: '🚒  Only for Emergencies'},
  {value: STATUS.DND, label: '🚫 Do Not Disturb'},
  {value: STATUS.CUSTOM, label: '❓ Custom'}
];

const SORT_DESCRIPTIONS = [
  {
    value: "name", label: "Name", 
  }, 
  {
    value: "username", label: "Username", 
  }
]; 


const CONTACTS = [
  {
    value: 'PERSON', 
    label: '💁 In-Person',
    emoji: '💁'
  },
  {
    value: 'CELL', 
    label: '📞 Cell', 
    emoji: '📞', 
  },
  {
    value: 'SMS',
    label: '📱 Text',
    emoji: '📱'
  },
  {
    value: 'SLACK',
    label: '🦃 Slack',
    emoji: '🦃'
  },
  {
    value: 'EMAIL',
    label: '📬 Email',
    emoji: '📬'
  },
];

const emojiForContact = (value) => {
  const result = CONTACTS.filter((contact) => contact.value == value)
  return result[0].emoji; 
}; 

const INTEGRATIONS = ["Cell", "Text", "Slack"]; 

//TODO: UI Constants

export {STATUS, STATUS_DESCRIPTIONS, CONTACTS, INTEGRATIONS, SORT_DESCRIPTIONS, emojiForContact}; 