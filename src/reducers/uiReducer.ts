import { AnyAction } from 'redux';

const initialState = {
  notification: false,
  notificationMessage: 'empty',
  notificationTimeout: 3000,
  tab: 'Timer',
};

const ui = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return { ...state, notification: true, notificationMessage: action.message };
    case 'NOTIFICATION_HIDE':
      return { ...state, notification: false, notificationMessage: ''};
    case 'TAB_CHANGE':
      return { ...state, tab: action.tab };
    default:
      return state;
  }
};

export default ui;
