// screens/RestScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const RestScreen = ({ route, navigation }) => {
  const { exercises, nextIndex, isLast } = route.params;
  const [restTime, setRestTime] = useState(10); // Tiempo de descanso

  useEffect(() => {
    const timer = setInterval(() => {
      setRestTime((prev) => prev - 1);
    }, 1000);

    if (restTime === 0) {
      clearInterval(timer);
      if (isLast) {
        // Redirigir al inicio o a una pantalla final
        navigation.replace('Motivation'); 
      } else {
        // Redirigir al siguiente ejercicio
        navigation.replace('Training', {
          exercise: exercises[nextIndex],
          nextIndex: nextIndex + 1,
          isLast: nextIndex === exercises.length - 1,
        });
      }
    }
    console.log('Route Params:', route.params);

    return () => clearInterval(timer);
  }, [restTime]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Tiempo para descansar!</Text>
      <Text style={styles.timer}>Recuerda hidratarte despues del ejercicio</Text>
      <Image
        source={require('../../assets/image/descanso.png')}
        style={styles.image}
      />
      <Text style={styles.timer}>Descanso: {restTime}s</Text>
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
    marginBottom: 20
  },
});

export default RestScreen;