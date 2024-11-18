import React from 'react';
import { Button } from 'react-native';
import * as Notifications from 'expo-notifications';

const NotificationScheduler = () => {
  const scheduleDailyNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Es hora de entrenar! 💪",
        body: "No olvides completar tu rutina de ejercicios hoy.",
        data: { activity: "training" },
      },
      trigger: {
        hour: 21,
        minute: 17,
        repeats: true,
      },
    });
    alert('Notificación diaria programada');
  };

  return;
};

export default NotificationScheduler;
