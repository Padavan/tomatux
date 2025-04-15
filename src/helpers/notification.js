function requestPermission() {
  Notification.requestPermission();
};

/** @param {string} message */
function sendNotification(message) {
  if (!('Notification' in window)) {
    console.log('Browser doesnt support web notification');
  } else if (Notification.permission === 'granted') {
    const notification = new Notification(
      "Pomodoro timer",
      {
        body: message,
      });
    console.info(message)
  }
};


export { requestPermission, sendNotification };