export const requestPermission = () => {
  Notification.requestPermission();
};

export const sendNotification = (message) => {
  if (!('Notification' in window)) {
    console.log('Browser doesnt support web notification');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(message);
  }
};
