// screens/MainScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function MainScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain"/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Registrarse</Text>
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
    width: '100%', // Asegúrate de que la imagen esté completa
    height: undefined,
    aspectRatio: 1, // Mantiene la proporción de la imagen
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row', // Coloca los botones uno al lado del otro
    justifyContent: 'space-around',
    width: '80%', // Ajustar el ancho de los botones
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    borderRadius: 30, // Hacer que el botón sea ovalado
    alignItems: 'center',
    marginVertical: 10,
    borderColor: 'black', // Borde negro
    borderWidth: 1, // Ancho del borde
    shadowColor: '#000', // Sombra
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
