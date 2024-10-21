import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { firebase } from '../firebase';

// Obtener dimensiones de la pantalla
const { width } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      Alert.alert('Registro exitoso', 'Has creado tu cuenta correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Regresar</Text>
        </TouchableOpacity>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre:</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nombre"
            style={styles.input}
          />
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
          <Text style={styles.label}>Confirmar contraseña:</Text>
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholder="Confirmar contraseña"
            style={styles.input}
          />
          <Text style={styles.label}>Edad:</Text>
          <TextInput
            value={age}
            onChangeText={setAge}
            placeholder="Edad"
            style={styles.input}
          />
          <Text style={styles.label}>Sexo:</Text>
          <TextInput
            value={sex}
            onChangeText={setSex}
            placeholder="Sexo"
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
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
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  backButtonText: {
    fontWeight: 'bold',
  },
  logo: {
    width: '50%',  // Ajuste para el 80% del ancho de la pantalla
    height: undefined,
    aspectRatio: 1,  // Mantener proporción de la imagen
    marginBottom: 20,
    alignSelf: 'center',
    marginTop: 80,
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
    height: 40,  // Ajustado para mayor espacio
    borderColor: 'blue',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 8,
    borderRadius: 10,
    backgroundColor: 'white',
    width: width * 0.85,  // Responsive: 85% del ancho de la pantalla
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    alignItems: 'center',
    borderRadius: 30,
    width: '60%',  // Ancho ajustado al 60%
    alignSelf: 'center',
    borderColor: 'black',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    marginTop: 20,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
