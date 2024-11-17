import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TrainingDaysConfig = ({ route, navigation }) => {
  const { level } = route.params;
  const [selectedDays, setSelectedDays] = useState([]);
  const firestore = getFirestore();
  const auth = getAuth();

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const toggleDaySelection = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSave = async () => {
    if (selectedDays.length === 0) {
      Alert.alert('Error', 'Debes seleccionar al menos un día.');
      return;
    }

    const user = auth.currentUser; // Obtén el usuario autenticado
    if (!user) {
      Alert.alert('Error', 'No se encontró un usuario autenticado.');
      return;
    }

    const userId = user.uid; // Toma el ID único del usuario

    try {
      await setDoc(doc(firestore, 'userTrainingDays', userId), {
        level,
        selectedDays,
        timestamp: new Date(),
      });
      Alert.alert('Éxito', 'Tus días de entrenamiento se han guardado.');
      navigation.navigate('ProgressCalendar');
    } catch (error) {
      console.error('Error al guardar los días:', error);
      Alert.alert('Error', 'No se pudo guardar la selección. Inténtalo de nuevo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus días de entrenamiento</Text>
      <Image 
        source={require('../../assets/image/Diasentreno.jpeg')} 
        style={styles.image} 
        resizeMode="contain" 
      />
      <View style={styles.daysContainer}>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[
              styles.dayButton,
              selectedDays.includes(day) && styles.selected,
            ]}
            onPress={() => toggleDaySelection(day)}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSave}>
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
