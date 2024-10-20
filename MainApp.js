import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginScreen';
import LevelSelectionScreen from './screens/LevelSelectionScreen';
import BeginnerScreen from './screens/BeginnerScreen';
import IntermediateScreen from './screens/IntermediateScreen';
import AdvancedScreen from './screens/AdvancedScreen';
import TrainingDaysConfig from './screens/TrainingDaysConfig'; 

const Stack = createStackNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrainingDaysConfig" component={TrainingDaysConfig} options={{ headerShown: false, title: 'Configurar Días' }} />
        <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


