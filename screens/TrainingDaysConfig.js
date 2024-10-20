import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TrainingDaysConfig = ({ navigation }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();

  const daysOfWeek = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSelect = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        const userDocRef = doc(firestore, 'trainingDays', user.uid);
        await setDoc(userDocRef, { days: selectedDays });
        console.log('Días seleccionados guardados en Firestore:', selectedDays);
      } catch (error) {
        console.error('Error al guardar los días:', error);
      }
    } else {
      console.error('No hay usuario autenticado');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus días de entrenamiento</Text>

      {}
      <Image 
        source={require('../assets/Diasentreno.jpeg')} 
        style={styles.image} 
        resizeMode="contain" 
      />
      
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day) => (
          <TouchableOpacity 
            key={day} 
            style={[styles.dayButton, selectedDays.includes(day) ? styles.selected : null]} 
            onPress={() => toggleDay(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSelect}>
          <Text style={styles.buttonText}>Seleccionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#c6c5ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: '80%', 
    height: 220, 
    marginBottom: 20, 
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dayButton: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    borderRadius: 30,
    minWidth: 100,
    alignItems: 'center',
    margin: 5,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  selected: {
    backgroundColor: '#4caf50',
  },
  dayText: {
    fontWeight: 'bold',
    color: '#000',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    borderRadius: 30,
    width: '40%',
    alignItems: 'center',
    marginBottom: 15,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default TrainingDaysConfig;

