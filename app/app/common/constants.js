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

const CONTACTS = [
  {value: 'PERSON', label: '💁 In-Person'},
  {value: 'CELL', label: '📞 Cell'},
  {
    value: 'SMS',
    label: '📱 Text',
  },
  {
    value: 'SKYPE',
    label: ' Skype',
  },
];

//TODO: UI Constants

export {STATUS, STATUS_DESCRIPTIONS, CONTACTS}