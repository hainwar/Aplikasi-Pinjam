import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './frontend/Login';
import Register from './frontend/Register';
import Home from './frontend/Home';
import Peminjaman from './frontend/Peminjaman';
import Pengembalian from './frontend/Pengembalian';
import data from './frontend/history';


const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={Home} 
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
          name="Peminjaman" 
          component={Peminjaman} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="Pengembalian" 
          component={Pengembalian} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
        <Stack.Screen 
          name="data" 
          component={data} 
          options={{ 
            headerShown: false,
            gestureEnabled: false 
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
