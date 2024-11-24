import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { db, auth } from '../../../firebase.js';
import { setDoc, doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

export default function LevelSelectionScreen({ navigation }) {
  const levels = ['Principiante', 'Intermedio', 'Avanzado'];

  const saveLevelToFirestore = async (level) => {
    const user = auth.currentUser; 
    if (user) {
      const userDocRef = doc(db, 'users', user.uid); 
      try {
        const userDoc = await getDoc(userDocRef); 

        if (userDoc.exists()) {
          
          await updateDoc(userDocRef, {
            Plandeentrenamiento: level,
            updatedAt: serverTimestamp(), 
          });
          console.log(`El nivel ${level} ha sido actualizado para el usuario ${user.uid}`);
        } else {
          
          await setDoc(userDocRef, {
            Plandeentrenamiento: level,
            createdAt: serverTimestamp(),
            userId: user.uid,
          });
          console.log(`El nivel ${level} ha sido creado para el usuario ${user.uid}`);
        }
      } catch (error) {
        console.error('Error al guardar en Firestore:', error);
      }
    } else {
      console.log('No hay usuario autenticado.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Regresar</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Selecciona tu nivel!</Text>
      <Image
        source={require('../../assets/image/level_image.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.buttonContainer}>
        {levels.map((level) => (
          <TouchableOpacity
            key={level}
            style={styles.button}
            onPress={() => {
              saveLevelToFirestore(level); 
              navigation.navigate('DaySelector', { level }); 
            }}
          >
            <Text style={styles.levelText}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  image: {
    width: '80%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFE8E5',
    padding: 15,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    marginBottom: 15,
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
