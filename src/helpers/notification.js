/** @param {() => void} callback */
export function requestPermission(callback) {
  Notification.requestPermission(callback);
}

/** @param {string} message */
export function sendNotification(message) {
  if (!("Notification" in window)) {
    console.error("Browser doesnt support web notification");
  } else if (Notification.permission === "granted") {
    new Notification("Pomodoro timer", {
      body: message,
    });
    console.info(message);
  }
}
