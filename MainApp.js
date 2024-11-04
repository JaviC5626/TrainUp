import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../TrainUp/src/MainScreen';
import RegisterScreen from '../TrainUp/src/screens/auth/RegisterScreen';
import LoginScreen from '../TrainUp/src/screens/auth/LoginScreen';
import LevelSelectionScreen from '../TrainUp/src/screens/levels/LevelSelectionScreen';
import ProgressCalendar from '../TrainUp/src/screens/levels/ProgressCalendar';
import Training from '../TrainUp/src/screens/levels/Training';
import BeginnerScreen from '../TrainUp/src/screens/levels/BeginnerScreen';
import IntermediateScreen from '../TrainUp/src/screens/levels/IntermediateScreen';
import AdvancedScreen from '../TrainUp/src/screens/levels/AdvancedScreen';
import TrainingDaysConfig from '../TrainUp/src/screens/levels/TrainingDaysConfig'; 
import RoutineDisplayScreens from './src/screens/levels/RoutuneDisplayScreens';
import MotivationScreen from './src/screens/levels/MotivationScreen';
import ProfileScreen from './src/screens/levels/ProfileScreen';

const Stack = createStackNavigator();

export default function MainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelSelection" component={LevelSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TrainingDaysConfig" component={TrainingDaysConfig} options={{ headerShown: false, }} />
        <Stack.Screen name="ProgressCalendar" component={ProgressCalendar} options={{ headerShown: false, }} />
        <Stack.Screen name="Training" component={Training} options={{ headerShown: false, }} />
        <Stack.Screen name="Beginner" component={BeginnerScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Intermediate" component={IntermediateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Advanced" component={AdvancedScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LevelSelector" component={LevelSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="DaySelector" component={TrainingDaysConfig} options={{ headerShown: false}} />
        <Stack.Screen name="RoutineDisplay" component={RoutineDisplayScreens} options={{ headerShown: false}} />
        <Stack.Screen name="Motivation" component={MotivationScreen} options={{ headerShown: false}} />
        <Stack.Screen name="Perfil" component={ProfileScreen} options={{ headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


