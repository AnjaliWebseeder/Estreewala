import React from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import {DrawerProvider} from './src/navigation/customDrawer/drawerContext'
import { AuthProvider } from './src/utils/context/authContext';


export default function App() {
  return (
    <AuthProvider>
      <DrawerProvider>
     <NavigationContainer >
   <Navigation/>
    </NavigationContainer>
   </DrawerProvider>
    </AuthProvider>
  

  )
}