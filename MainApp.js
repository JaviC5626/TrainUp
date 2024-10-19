// MainApp.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './src/MainScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import LevelSelectionScreen from './src/screens/levels/LevelSelectionScreen';
import BeginnerScreen from './src/screens/levels/BeginnerScreen';
import IntermediateScreen from './src/screens/levels/IntermediateScreen';
import AdvancedScreen from './src/screens/levels/AdvancedScreen';

const Stack = createStackNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
