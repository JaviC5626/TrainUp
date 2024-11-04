import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth, db } from './../../../firebase';

export default function ProfileScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDoc = await db.collection('users').doc(currentUser.uid).get();
          if (userDoc.exists) {
            setUserData(userDoc.data());
            setProfileImage(userDoc.data().profileImage); // Carga la imagen de perfil si existe
          } else {
            console.log("No se encontraron datos del usuario en Firestore.");
          }
        } else {
          console.error("Usuario no autenticado.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleImagePick = async () => {
    // Solicita permisos para acceder a la galería
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Permiso requerido", "Se necesita permiso para acceder a la galería.");
      return;
    }

    // Abre la galería para seleccionar una imagen
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!pickerResult.canceled) {
      const selectedImageUri = pickerResult.assets[0].uri;
      setProfileImage(selectedImageUri);
      
      // Guarda la URL de la imagen en Firestore (actualizando el perfil del usuario)
      const currentUser = auth.currentUser;
      if (currentUser) {
        try {
          await db.collection('users').doc(currentUser.uid).update({
            profileImage: selectedImageUri
          });
          Alert.alert("Éxito", "La imagen de perfil ha sido actualizada.");
        } catch (error) {
          console.error("Error al actualizar la imagen de perfil:", error);
        }
      }
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Perfil</Text>
      {userData ? (
        <>
          <Image 
            source={profileImage ? { uri: profileImage } : require('../../assets/image/logo.png')} 
            style={styles.profileImage} 
            resizeMode="cover" 
          />
          <TouchableOpacity style={styles.uploadButton} onPress={handleImagePick}>
            <Text style={styles.uploadButtonText}>Cambiar Foto</Text>
          </TouchableOpacity>
          <Text style={styles.userName}>{userData.name}</Text>
          <Text style={styles.userEmail}>{userData.email}</Text>
          
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Edad:</Text>
            <Text style={styles.infoText}>{userData.age}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Sexo:</Text>
            <Text style={styles.infoText}>{userData.sex}</Text>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={() => navigation.goBack()} 
          >
            <Text style={styles.buttonText}>Regresar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.errorText}>No se encontraron datos del usuario.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#A9A9A9',
  },
  uploadButton: {
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    width: '80%',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#E8F4FF',
    borderRadius: 8,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: 150,
    height: 40,
    backgroundColor: '#FFDAB9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginTop: 30,
    borderColor: '#333',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  }
});
