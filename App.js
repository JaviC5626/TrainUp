import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { firebase } from './firebase';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import './src/Notifications/Notification';

// Configura el manejador de notificaciones para controlar cómo se manejan las notificaciones recibidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  useEffect(() => {
    const testAuth = async () => {
      try {
        const userCredential = await firebase.auth().signInAnonymously();
        console.log('Inicio de sesión anónimo exitoso:', userCredential.user);
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    };

    const registerForPushNotificationsAsync = async () => {
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('¡Necesitamos permisos para enviar notificaciones!');
          return;
        }
        console.log('Permisos de notificaciones concedidos');
      } else {
        alert('Las notificaciones solo funcionan en dispositivos físicos.');
      }
    };

    const scheduleDailyNotification = async () => {
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "¡Hora de entrenar! 💪",
            body: "Recuerda completar tu rutina diaria.",
            sound: true,
          },
          trigger: {
            hour: 21, // Cambia esta hora por la que prefieras (hora local)
            minute: 26,
            repeats: true, // Repite la notificación diariamente
          },
        });
        console.log("Notificación diaria programada a las 8:00 AM.");
      } catch (error) {
        console.error("Error al programar la notificación:", error);
      }
    };

    testAuth();
    registerForPushNotificationsAsync();
    scheduleDailyNotification();
  }, []);

  return <MainApp />;
}
