import React from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import {DrawerProvider} from './src/navigation/customDrawer/drawerContext'
import { AuthProvider } from './src/utils/context/authContext';
import { Provider } from 'react-redux'
import store from "./src/redux/store"
import { ToastProvider } from './src/utils/context/toastContext';

export default function App() {
  return (
   <Provider store={store}>
 <ToastProvider>
      <AuthProvider>
      <DrawerProvider>
     <NavigationContainer >
   <Navigation/>
    </NavigationContainer>
   </DrawerProvider>
    </AuthProvider>
 </ToastProvider>
   </Provider>
  

  )
}