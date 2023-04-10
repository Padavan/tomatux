import { Dispatch } from 'redux';

export const requestPermission = () => {
  Notification.requestPermission();
};

export const sendNotification = (message: string) => {
  if (!('Notification' in window)) {
    console.log('Browser doesnt support web notification');
  } else if (Notification.permission === 'granted') {
    // const notification = new Notification(message);
    console.info(message)
  }
};

export const showThenHideSnackbar = (message: string, dispatch: Dispatch, timeout = 1000) => {
  dispatch({ type: 'NOTIFICATION_SHOW', message });
  setTimeout(() => dispatch({ type: 'NOTIFICATION_HIDE' }), timeout);
};
