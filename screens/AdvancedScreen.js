// screens/AdvancedScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList} from 'react-native';

export default function AdvancedScreen({ navigation }) {
  // Lista de ejercicios diarios 
  const exerciseData = [
    { key: '1', name: 'Sentadilla bulgara', sets: '3', reps: '25', muscleGroup: 'glúteo-cuádriceps' },
    { key: '2', name: 'Elevacion de piernas', sets: '3', reps: '20', muscleGroup: 'abdominales inferiores' },
    { key: '3', name: 'Elevacion de talones con barra', sets: '3', reps: '15', muscleGroup: 'tríceps sural' },
    { key: '4', name: 'Flexiones normal', sets: '3', reps: '30', muscleGroup: 'Pecho-tríceps' },
    { key: '5', name: 'Flexiones en diamante', sets: '3', reps: '30', muscleGroup: 'Pecho-tríceps' },
  ];

  // Renderizado de cada ejercicio en la tabla
  const renderExerciseItem = ({ item }) => (
    <View style={styles.tableRow}>
      <Text style={styles.tableCell}>{item.name}</Text>
      <Text style={styles.tableCell}>{item.sets}</Text>
      <Text style={styles.tableCell}>{item.reps}</Text>
      <Text style={styles.tableCell}>{item.muscleGroup}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
      
      <Text style={styles.title}>Plan de entrenamiento Avanzado</Text>
      <Text style={styles.title}>Duracion: 2 horas</Text>


      {/* Tabla de ejercicios */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell]}>Ejercicio</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Series</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Repeticiones</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>Grupo Muscular</Text>
        </View>
        
        <FlatList
          data={exerciseData}
          renderItem={renderExerciseItem}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: '#D0EDFF',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: 23,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  table: {
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#FFF255',
    padding: 8,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
    padding: 10,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});
