import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

// Importaciones de pantallas
import MainScreen from './src/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import LevelSelectionScreen from './src/screens/levels/LevelSelectionScreen';
import ProgressCalendar from './src/screens/levels/ProgressCalendar';
import Training from './src/screens/levels/Training';
import RoutineDisplayScreens from './src/screens/levels/RoutuneDisplayScreens';
import BeginnerScreen from './src/screens/levels/BeginnerScreen';
import IntermediateScreen from './src/screens/levels/IntermediateScreen';
import AdvancedScreen from './src/screens/levels/AdvancedScreen';
import TrainingDaysConfig from './src/screens/levels/TrainingDaysConfig';
import MotivationScreen from './src/screens/levels/MotivationScreen';
import ProfileScreen from './src/screens/levels/ProfileScreen';
import NotificationScheduler from './src/Notifications/NotificationScheduler';
import RestScreen from './src/screens/levels/RestSecreen';
import ExerciseScreen from './src/screens/levels/ExerciseScreen';
import Completado from './src/screens/levels/Completado';
import Informacion from './src/screens/levels/Informacion';

const Stack = createStackNavigator();

// Configurar el comportamiento por defecto de las notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function getActiveRouteName(navigationState) {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }
  return route.name;
}

export default function MainApp() {
  const navigationRef = React.useRef();

  React.useEffect(() => {
    // Manejadores de notificaciones
    const backgroundSubscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const data = response.notification.request.content.data;
        if (data.screen && navigationRef.current) {
          navigationRef.current.navigate(data.screen);
        }
      }
    );

    const foregroundSubscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log('Notificación recibida en primer plano:', notification);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(backgroundSubscription);
      Notifications.removeNotificationSubscription(foregroundSubscription);
    };
  }, []);

  return (
    <View style={styles.container}>
      <NavigationContainer
        ref={navigationRef}
        onStateChange={(state) => {
          const currentScreen = getActiveRouteName(state);
        }}
      >
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="TrainingDaysConfig" component={TrainingDaysConfig} options={{ headerShown: false }} />
          <Stack.Screen name="ProgressCalendar" component={ProgressCalendar} options={{ headerShown: false }} />
          <Stack.Screen name="Training" component={Training} options={{ headerShown: false }} />
          <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RoutineDisplay" component={RoutineDisplayScreens} options={{ headerShown: false }} />
          <Stack.Screen name="LevelSelector" component={LevelSelectionScreen} options={{ headerShown: false }} />
          <Stack.Screen name="DaySelector" component={TrainingDaysConfig} options={{ headerShown: false }} />
          <Stack.Screen name="Motivation" component={MotivationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Rest" component={RestScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Completado" component={Completado} options={{ headerShown: false }} />
          <Stack.Screen name="Informacion" component={Informacion} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* Agrega NotificationScheduler debajo del navegador */}
      <NotificationScheduler />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
