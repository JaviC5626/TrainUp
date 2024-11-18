// screens/MotivationScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MotivationScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>MOTIVACION DEL DIA!</Text>
      <Text style={styles.message}>Cada repeticion te acerca más a tu mejor versión. ¡No te detengas!</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Rest')}>
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
    logo: {
      width: '25%',
      height: undefined,
      aspectRatio: 1,
      marginBottom: 1,
      marginTop: 60,
      top: -10,
      left: -130,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      position: 'absolute',
      top: 120,
      right: 20,
    },
    message: {
      fontSize: 15,
      marginHorizontal: 14,
      marginBottom: 5,
    },
    motive: {
      width: '70%',
      height: undefined,
      aspectRatio: 1,
      marginBottom: 20,
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '200px',
    },
    button: {
      width: 180,
      height: 40,
      backgroundColor: '#FF8E5',
      padding: 15,
      borderRadius: 20,
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
      margin: -5,
    },
  });