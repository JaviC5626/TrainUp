// screens/MotivationScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MotivationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/motivation.png')} style={styles.motive} resizeMode="contain"/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LevelSelection')}>
          <Text style={styles.buttonText}>Selecionar Nivel</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ProgressCalendar')}>
          <Text style={styles.buttonText}>Calendario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Trainng')}>
          <Text style={styles.buttonText}>Plan</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.buttonText}>Perfil</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#D0EDFF',
    },
    motive: {
      width: '100%',
      height: undefined,
      aspectRatio: 1,
      marginBottom: 20,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '80%',
    },
    button: {
      backgroundColor: '#FFE8E5',
      padding: 15,
      borderRadius: 30,
      alignItems: 'center',
      marginVertical: 10,
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