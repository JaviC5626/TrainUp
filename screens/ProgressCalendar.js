import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ProgressCalendar = ({ navigation }) => {
  const [trainedDays, setTrainedDays] = useState({});
  const [performance, setPerformance] = useState(0);
  const firestore = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(firestore, 'trainingDays', user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const data = userDoc.data();
          const daysTrained = data.days || [];
          
          // Convertir días entrenados a formato { 'YYYY-MM-DD': { marked: true, dots: [{ color: 'blue' }] } }
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
          setPerformance((daysTrained.length / 30) * 100); // Suponiendo un rendimiento mensual basado en días entrenados
        }
      }
    };

    fetchData();
  }, [firestore, auth]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendario de Progreso</Text>
      <Calendar
        markedDates={trainedDays}
        // Puedes personalizar más las propiedades del calendario según tus necesidades
        style={styles.calendar}
        theme={{
          todayTextColor: 'red',
          arrowColor: 'blue',
          monthTextColor: 'blue',
        }}
      />
      <Text style={styles.performanceText}>Rendimiento: {performance.toFixed(0)}%</Text>

      <View style={styles.buttonsContainer}>
        <Button title="Regresar" onPress={() => navigation.goBack()} />
        <Button title="Continuar" onPress={() => {
          
          console.log('Continuar');
        }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendar: {
    width: '100%',
    marginBottom: 20,
  },
  performanceText: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default ProgressCalendar;
