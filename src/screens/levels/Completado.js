import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const CongratulationsScreen = ({ navigation }) => {
  const handleGoNext = () => {
    navigation.navigate('ProgressCalendar'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡FELICIDADES!</Text>
      <Text style={styles.message}>HAZ COMPLETADO EL ENTRENAMIENTO</Text>
      <Image
        source={require('../../assets/image/felicidades.jpg')} 
        style={styles.image}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.button} onPress={handleGoNext}>
        <Text style={styles.buttonText}>Siguiente</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0EDFF',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6347',
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 20,
    borderRadius: 30,
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
    textAlign: 'center',
  },
});

export default CongratulationsScreen;
