export function requestPermission(callback: () => void) {
  Notification.requestPermission(callback);
}

export function sendNotification(message: string) {
  if (!("Notification" in window)) {
    console.error("Browser doesnt support web notification");
  } else if (Notification.permission === "granted") {
    new Notification("Pomodoro timer", {
      body: message,
    });
    console.info(message);
  }
}
