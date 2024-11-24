import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebase';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [timer, setTimer] = useState(0);
  const [seriesCompleted, setSeriesCompleted] = useState(0); // Contador de series completadas
  const firestore = getFirestore();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          console.log('Usuario no autenticado');
          return;
        }

        const userDocRef = doc(firestore, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const userLevel = userData.Plandeentrenamiento;

          const planIds = {
            Principiante: 'nHInWtm0b7KnCkCe4hDR',
            Intermedio: 'rB2NE3NxgWja369Urv8f',
            Avanzado: 'Vik11jk212B3unuHlaLE',
          };

          if (planIds[userLevel]) {
            const collectionName = userLevel === 'Principiante' ? 'Planprincipante' : `Plan${userLevel}`;
            const exercisesDocRef = doc(firestore, collectionName, planIds[userLevel]);
            const exercisesDoc = await getDoc(exercisesDocRef);

            if (exercisesDoc.exists()) {
              const data = exercisesDoc.data();
              const { Ejercicio, Series, Repeticiones, Imagenes } = data;

              const exerciseList = Ejercicio.map((ejercicio, index) => ({
                nombre: ejercicio,
                series: Series[index],
                repeticiones: Repeticiones[index],
                imagen: Imagenes[index],
              }));

              setExercises(exerciseList);
            } else {
              console.log('No hay documentos de ejercicios para este plan');
            }
          } else {
            console.log('Nivel de entrenamiento no válido');
          }
        } else {
          console.log('No se encontró el documento del usuario');
        }
      } catch (error) {
        console.error('Error al obtener ejercicios: ', error);
      }
    };

    fetchExercises();
  }, [firestore]);

  useEffect(() => {
    let interval;
    if (isStarted) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isStarted]);

  const handleStartExercise = () => {
    setIsStarted(true);
  };

  const handleContinue = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      if (seriesCompleted + 1 >= currentExercise.series) {
        navigation.navigate('Completado'); 
      } else {
        setCurrentIndex(0);
        setSeriesCompleted((prevSeries) => prevSeries + 1); 
      }
    }
    setIsStarted(false);
    setTimer(0);
  };
  

  const handleBack = () => {
    navigation.goBack();
  };

  if (exercises.length === 0) {
    return <Text>Cargando ejercicios...</Text>;
  }

  const currentExercise = exercises[currentIndex];

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Ejercicio: {currentExercise.nombre}</Text>

      <Image
        source={{ uri: currentExercise.imagen }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.instructions}>
        Instrucciones: Realiza {currentExercise.series} series de {currentExercise.repeticiones} repeticiones.
      </Text>

      <Text style={styles.seriesCounter}>
        Series completadas: {seriesCompleted}/{currentExercise.series}
      </Text>

      {isStarted ? (
        <>
          <Text style={styles.timer}>Tiempo: {timer} segundos</Text>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.startButton} onPress={handleStartExercise}>
          <Text style={styles.buttonText}>Iniciar Ejercicio</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#D0EDFF',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    padding: 10,
    borderRadius: 30,
    backgroundColor: '#FFE8E5',
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
  backButtonText: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 80,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  instructions: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  timer: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  seriesCounter: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#FFE8E5',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
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
  continueButton: {
    backgroundColor: '#FFE8E5',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
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
    textAlign: 'center',
  },
});

export default ExerciseListScreen;
