import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function IntermediateScreen({ navigation }) {
  // Lista de ejercicios diarios 
  const exerciseData = [
    { key: '1', name: 'Sentadilla normal', sets: '2', reps: '15', muscleGroup: 'glúteos- isquiotibiales-cuádriceps' },
    { key: '2', name: 'Abdominales', sets: '3', reps: '10', muscleGroup: 'Abdomen' },
    { key: '3', name: 'Burpies', sets: '3', reps: '10', muscleGroup: 'pectorales-tríceps-hombros-cuádricepsfemorales-gemelos' },
    { key: '4', name: 'Elevación de pantorrilla', sets: '2', reps: '12', muscleGroup: 'gastrocnemio-sóleo' },
    { key: '5', name: 'Peso muerto', sets: '2', reps: '12', muscleGroup: 'espalda-tronco' },
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
      
      <Text style={styles.title}>Plan de entrenamiento Intermedio</Text>
      <Text style={styles.duration}>Duración: 1 hora & 30 minutos</Text>

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

      {/* Botón de Continuar */}
      <TouchableOpacity 
        style={styles.continueButton} 
        onPress={() => navigation.navigate('TrainingDaysConfig')}
      >
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
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
    backgroundColor: '#13f5f2',
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
  continueButton: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    marginBottom: 20,
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
