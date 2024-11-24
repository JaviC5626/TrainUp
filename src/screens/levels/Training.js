import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth } from '../../../firebase'; 

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
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

          // ID de los planes por nivel
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

              // Crear la lista de ejercicios
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

  const handleContinue = () => {
    const currentExercise = exercises[currentIndex];

    navigation.navigate('Exercise', {
      exercise: currentExercise,
      exercises, 
      nextIndex: currentIndex + 1,
      isLast: currentIndex === exercises.length - 1,
    });
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

      {/* Imagen dinámica del ejercicio */}
      <Image
        source={{ uri: currentExercise.imagen }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.instructions}>
        Instrucciones: Realiza {currentExercise.series} series de {currentExercise.repeticiones} repeticiones.
      </Text>

      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
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
  continueButton: {
    backgroundColor: '#FFE8E5',
    padding: 20,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    alignItems: 'center', 
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
