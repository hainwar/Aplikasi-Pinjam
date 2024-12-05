import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Home from './frontend/Home';
import Peminjaman from './frontend/Peminjaman';
import History from './frontend/History';
import DetailHistory from './frontend/DetailHistory';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{
            headerShown: false,
          }} 
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Peminjaman" 
          component={Peminjaman} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="History" 
          component={History} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="DetailHistory" 
          component={DetailHistory} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
