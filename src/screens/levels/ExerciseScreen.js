import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ExerciseScreen = ({ route, navigation }) => {
  const { exercise, exercises, nextIndex, isLast } = route.params;
  const [timeLeft, setTimeLeft] = useState(10); // Tiempo de ejercicio

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      navigation.replace('Rest', { 
        exercises, 
        nextIndex, 
        isLast 
      });
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ejercicio: {exercise.nombre}</Text>
      <Text style={styles.timer}>{timeLeft} segundos restantes</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  timer: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF4500',
  },
});

export default ExerciseScreen;