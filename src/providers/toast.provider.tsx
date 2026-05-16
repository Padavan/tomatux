import React, { useState, useCallback, useContext, PropsWithChildren } from "react";
import { Snackbar } from "../features/snackbar.component";
import { sendNotification } from "../helpers/notification";

const TOAST_TIME = 3000;

const ToastContext = React.createContext({
  show: (_message: string, _global: boolean) => {},
});

const globalNotificationEnabled = () => Notification.permission === "granted";

const ToastProvider = (props: PropsWithChildren) => {
  const [isShown, setIsShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    setIsShowToast(true);
    if (globalNotificationEnabled()) {
      sendNotification(message);
    }
    setTimeout(() => setIsShowToast(false), TOAST_TIME);
  }, []);

  return (
    <ToastContext.Provider value={{ show: showToast }}>
      {props.children}
      <Snackbar show={isShown} message={toastMessage} />
    </ToastContext.Provider>
  );
};

const useToast = () => useContext(ToastContext);

export { ToastContext, ToastProvider, useToast };
