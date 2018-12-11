const initialState = {
  notification: false,
  notificationMessage: 'empty',
  notificationTimeout: 3000
};

const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'NOTIFICATION_SHOW':
      return { ...state, notification: true, notificationMessage: action.message };
    case 'NOTIFICATION_HIDE':
      return { ...state, notification: false, notificationMessage: ''};
    default:
      return state;
  }
};

export default ui;
