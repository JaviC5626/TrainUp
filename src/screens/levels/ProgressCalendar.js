import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProgressCalendar = ({ navigation }) => {
  const [trainedDays, setTrainedDays] = useState({});
  const [performance, setPerformance] = useState(0);
  const [totalTrainedDays, setTotalTrainedDays] = useState(0);
  const [userDocRef, setUserDocRef] = useState(null); 
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(firestore, 'users', user.uid); 
        setUserDocRef(docRef); 
        const userDoc = await getDoc(docRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const daysTrained = data.days || [];

          const markedDays = daysTrained.reduce((acc, day) => {
            const date = new Date(day);
            const dateString = date.toISOString().split('T')[0];
            acc[dateString] = {
              marked: true,
              dots: [{ color: 'blue', key: 'trained', selectedDotColor: 'blue' }],
            };
            return acc;
          }, {});

          setTrainedDays(markedDays);
          setPerformance((daysTrained.length / 30) * 100);
          setTotalTrainedDays(daysTrained.length);
        }
      }
    };

    fetchData();
  }, [firestore, auth]);

  const handleMarkAsCompleted = async () => {
    const user = auth.currentUser;
    if (user && userDocRef) {
      const currentDate = new Date().toISOString().split('T')[0]; 
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const daysTrained = data.days || [];

        
        if (!daysTrained.includes(currentDate)) {
          
          daysTrained.push(currentDate);
          await setDoc(userDocRef, { days: daysTrained }, { merge: true });

          
          const updatedTrainedDays = { ...trainedDays };
          updatedTrainedDays[currentDate] = {
            marked: true,
            dots: [{ color: 'blue', key: 'trained', selectedDotColor: 'blue' }],
          };
          setTrainedDays(updatedTrainedDays);
          setTotalTrainedDays(daysTrained.length);
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Aquí podrás ver tu calendario de Progreso</Text>

      <Calendar
        markedDates={trainedDays}
        style={styles.calendar}
        theme={{
          todayTextColor: 'red',
          arrowColor: 'blue',
          monthTextColor: 'blue',
        }}
      />

      <Text style={styles.performanceText}>Rendimiento: {performance.toFixed(0)}%</Text>

      {/* Mostrar los días entrenados */}
      <Text style={styles.daysTrainedText}>Días entrenados: {totalTrainedDays}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Motivation')}>
          <Text style={styles.buttonText}>Continuar</Text>
        </TouchableOpacity>
        {/* Botón para marcar el día de hoy como completado */}
        <TouchableOpacity style={styles.button} onPress={handleMarkAsCompleted}>
          <Text style={styles.buttonText}>Marcar el día de hoy como completado</Text>
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
  calendar: {
    width: '100%',
    marginBottom: 20,
  },
  performanceText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  daysTrainedText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 5,
    borderRadius: 30,
    width: '80%',
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

export default ProgressCalendar;
