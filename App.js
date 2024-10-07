// App.js
import React, { useEffect } from 'react';
import MainApp from './MainApp';
import { firebase } from './firebase';

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

    testAuth();
  }, []);

  return <MainApp />;
}
