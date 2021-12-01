import { playAlertSound } from '../components/audio';

const showNotification = function (title: string, message: string): void {
  new Notification(title, {
    body: message,
  });
};

export const notify = function (title: string, message: string = ''): boolean {
  // Let's check if the browser supports notifications
  if (!('Notification' in window)) {
    return false;
  }

  // Let's check whether notification permissions have already been granted
  if (Notification.permission === 'granted') {
    // If it's okay let's create a notification
    showNotification(title, message);
    // play sound
    playAlertSound();

    return true;
  }

  // Otherwise, we need to ask the user for permission
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === 'granted') {
        new Notification('Notifications are allowed now');
        return true;
      }
      new Notification('Notifications are not allowed');
      return false;
    });
  }
};
