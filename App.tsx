import React from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import {DrawerProvider} from './src/navigation/customDrawer/drawerContext'

export default function App() {
  return (
   <DrawerProvider>
     <NavigationContainer>
   <Navigation/>
    </NavigationContainer>
   </DrawerProvider>

  )
}