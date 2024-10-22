import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'; // Importar el hook de navegación

// Función para obtener la rutina desde Firestore
const getRoutine = async (level, day) => {
  console.log(`Fetching routine for day: ${day}, level: ${level}`); // Debugging
  try {
    const firestore = getFirestore();
    const routineDocRef = doc(firestore, 'trainingPlans', level, 'days', day);
    const routineDoc = await getDoc(routineDocRef);
    
    if (routineDoc.exists()) {
      return routineDoc.data(); // Retorna los datos si existen
    } else {
      console.log('No existe el documento');
      return null; // Retornar null si el documento no existe
    }
  } catch (error) {
    console.error('Error obteniendo la rutina:', error);
    return null; // Retornar null en caso de error
  }
};

const RoutineDisplayScreens = ({ route }) => {
  const { level, day } = route.params; // Extraer parámetros de la ruta
  const [routine, setRoutine] = useState(null); // Estado para la rutina
  const navigation = useNavigation(); // Hook de navegación

  // useEffect para obtener la rutina al cargar el componente
  useEffect(() => {
    const fetchRoutine = async () => {
      const fetchedRoutine = await getRoutine(level, day); // Asegurarse del orden correcto
      setRoutine(fetchedRoutine);
      console.log(fetchedRoutine); // Debugging
    };
    fetchRoutine();
  }, [day, level]);

  // Manejo de carga
  if (!routine) {
    return <Text style={styles.loadingText}>Cargando rutina...</Text>;
  }

  // Renderizar la tabla de rutina
  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>{`Rutina de ${day} - Nivel ${level}`}</Text>
      
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Ejercicio</Text>
          <Text style={styles.tableHeaderText}>Repeticiones</Text>
          <Text style={styles.tableHeaderText}>Series</Text>
          <Text style={styles.tableHeaderText}>Grupo Muscular</Text>
        </View>
        {Object.entries(routine).length > 0 ? (
          Object.entries(routine).map(([exercise, details]) => (
            <View key={exercise} style={styles.tableRow}>
              <Text style={styles.tableCell}>{exercise}</Text>
              <Text style={styles.tableCell}>{details.Repeticiones}</Text>
              <Text style={styles.tableCell}>{details.Series}</Text>
              <Text style={styles.tableCell}>{details.GrupoMuscular}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.noDataText}>No hay ejercicios para este día.</Text>
        )}
      </View>

      <View style={styles.buttonContainer}>
      <TouchableOpacity
       style={styles.roundButton2} onPress={() => navigation.navigate('Training')}>
        
          <Text style={styles.buttonText2}>Iniciar</Text>
        </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.roundButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Regresar</Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D0EDFF',
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 25,
    marginTop: 30,
    textAlign: 'center',
  },
  tableContainer: {
    marginTop: 20,
    borderWidth: 3,
    borderColor: '#FFA500',
    borderRadius: 8,
    overflow: 'hidden', // Redondear bordes
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFA500',
    padding: 10,
    justifyContent: 'space-between',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  noDataText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#888', // Color gris para el texto de no datos
  },
  buttonContainer: {
    marginTop: 40,
    alignItems: 'center', // Centrar el botón
    
  },
  roundButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50, // Hacer el botón redondo
    width: 150, // Ancho del botón
    alignItems: 'center', // Centrar el texto dentro del botón
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roundButton2: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 50, // Hacer el botón redondo
    width: 150, // Ancho del botón
    alignItems: 'center', // Centrar el texto dentro del botón
  },
  buttonText2: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default RoutineDisplayScreens;

