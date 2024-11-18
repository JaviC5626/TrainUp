// screens/RestScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RestScreen = ({ navigation }) => {
  const [countdown, setCountdown] = useState(30); // Temporizador de 10 segundos

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown ), 1000);
      return () => clearTimeout(timer);
    } else {
      navigation.goBack(); // O redirige a otra pantalla
    }
  }, [countdown]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Tiempo para descansar!</Text>
      <Image
        source={require('../assets/rest.png')} // Cambia a tu imagen
        style={styles.image}
      />
      <Text style={styles.timer}>Descanso: {countdown}s</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0EDFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20
  },
  timer: {
    fontSize: 18,
  },
});

export default RestScreen;