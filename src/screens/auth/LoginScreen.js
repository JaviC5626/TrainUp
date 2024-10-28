// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { firebase } from '../../../firebase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente');
      navigation.navigate('Motivation');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
      <Image source={require('../../assets/image/logo.png')} style={styles.logo} resizeMode="contain" />
      <View style={styles.formContainer}>
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Correo electrónico"
          style={styles.input}
        />
        <Text style={styles.label}>Contraseña:</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Contraseña"
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

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
  logo: {
    width: '40%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 1,
    alignSelf: 'center',
    marginTop: 60,
  },
  formContainer: {
    marginTop: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 10,
    alignItems: 'center',
    borderRadius: 30,
    width: '50%',
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});
