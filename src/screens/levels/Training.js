import React, { useEffect, useState } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const firestore = getFirestore();

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const docRef = doc(firestore, 'Planprincipante', 'nHInWtm0b7KnCkCe4hDR'); 

        if (docSnap.exists()) {
          const data = docSnap.data();
          const { Ejercicio, Series, Repeticiones } = data;

          // Crear una lista de objetos que contenga los datos
          const exerciseList = Ejercicio.map((ejercicio, index) => ({
            nombre: ejercicio,
            series: Series[index],
            repeticiones: Repeticiones[index],
          }));

          setExercises(exerciseList);
        } else {
          console.log("No hay documento!");
        }
      } catch (error) {
        console.error("Error al obtener ejercicios: ", error);
      }
    };

    fetchExercises();
  }, [firestore]);

  const handleContinue = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(currentIndex + 1); 
    } else {
      
      setCurrentIndex(0); 
    }
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
      
      {/* Imagen del ejercicio */}
      <Image source={require('../assets/training.jpeg')} style={styles.image} resizeMode="contain" />

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
    padding: 15,
    borderRadius: 30,
    width: '70%',
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
  },
});

export default ExerciseListScreen;
