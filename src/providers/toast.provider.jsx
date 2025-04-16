import React, { useState, useCallback, useContext } from 'react';
import { Snackbar } from 'src/components/snackbar.component';
import { sendNotification } from '../helpers/notification';

const TOAST_TIME = 3000;

const ToastContext = React.createContext({
  /**
   * @param {string} message
   * @param {boolean} [global] - send WebAPI notification as well
   * */
  show: (message, global) => {},
});

const globalNotificationEnabled = () => Notification.permission === 'granted';

/** @param {import('react').PropsWithChildren} props */
const ToastProvider = (props) => {
  const [isShown, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');


  const showToast = useCallback(
    /** @param {string} message */
    (message) => {
      setToastMessage(message);
      setIsShowToast(true);
      if (globalNotificationEnabled()) {
        sendNotification(message);
      }
      setTimeout(() => setIsShowToast(false), TOAST_TIME);
    },
    []
  );

 return (
   <ToastContext.Provider value={{ show: showToast }}>
     {props.children},
     <Snackbar show={isShown} message={toastMessage} />
   </ToastContext.Provider>
 );
}

const useToast = () => useContext(ToastContext);

export { ToastContext, ToastProvider, useToast }; 
