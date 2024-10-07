// App.js
import React, { useEffect } from 'react'; // Asegúrate de importar useEffect
import MainApp from './MainApp'; // Asegúrate de importar MainApp
import { firebase } from './firebase';  // Asegúrate de importar Firebase

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

  return <MainApp />; // Muestra el componente principal
}
