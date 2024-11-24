// src/screens/levels/Informacion.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function Informacion({ navigation }) {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('masculino');
  const [imc, setImc] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tmb, setTmb] = useState(null);

  const calcularIMC = () => {
    if (peso && altura) {
      const alturaMetros = parseFloat(altura) / 100; 
      const resultado = parseFloat(peso) / (alturaMetros * alturaMetros); 
      setImc(resultado.toFixed(2)); 

      
      if (resultado < 18.5) {
        setMensaje('Bajo peso');
      } else if (resultado >= 18.5 && resultado < 24.9) {
        setMensaje('Peso normal');
      } else if (resultado >= 25 && resultado < 29.9) {
        setMensaje('Sobrepeso');
      } else {
        setMensaje('Obesidad');
      }
    } else {
      alert('Por favor, ingresa ambos valores.');
    }
  };

  const calcularTMB = () => {
    if (peso && altura && edad) {
      let tmbValor;
      if (genero === 'masculino') {
        tmbValor =
          88.362 + 13.397 * parseFloat(peso) + 4.799 * parseFloat(altura) - 5.677 * parseInt(edad);
      } else {
        tmbValor =
          447.593 + 9.247 * parseFloat(peso) + 3.098 * parseFloat(altura) - 4.330 * parseInt(edad);
      }
      setTmb(tmbValor.toFixed(2)); 
    } else {
      alert('Por favor, ingresa todos los valores.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Calculadora de IMC y TMB</Text>

      {/* Formulario IMC */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu peso (kg)"
          keyboardType="numeric"
          value={peso}
          onChangeText={setPeso}
        />
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu altura (cm)"
          keyboardType="numeric"
          value={altura}
          onChangeText={setAltura}
        />
        <TouchableOpacity style={styles.button} onPress={calcularIMC}>
          <Text style={styles.buttonText}>Calcular IMC</Text>
        </TouchableOpacity>

        {imc && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>Tu IMC es: {imc}</Text>
            <Text style={styles.message}>{mensaje}</Text>
          </View>
        )}
      </View>

      {/* Formulario TMB */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ingresa tu edad"
          keyboardType="numeric"
          value={edad}
          onChangeText={setEdad}
        />
        <Picker
          selectedValue={genero}
          style={styles.picker}
          onValueChange={(itemValue) => setGenero(itemValue)}
        >
          <Picker.Item label="Masculino" value="masculino" />
          <Picker.Item label="Femenino" value="femenino" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={calcularTMB}>
          <Text style={styles.buttonText}>Calcular TMB</Text>
        </TouchableOpacity>

        {tmb && (
          <View style={styles.resultContainer}>
            <Text style={styles.result}>Tu TMB es: {tmb} calorías/día</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9F5FF',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
    marginTop: 80, 
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15,
    paddingLeft: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FFE8E5',  
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: '#333',  
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  result: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF5C8D',
  },
  message: {
    fontSize: 18,
    color: '#333',
    marginTop: 10,
    fontStyle: 'italic',
  },
  picker: {
    width: '90%',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#FFE8E5',  
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});
