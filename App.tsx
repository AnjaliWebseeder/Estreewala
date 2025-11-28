import React, { useEffect } from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerProvider } from './src/navigation/customDrawer/drawerContext'
import { AuthProvider } from './src/utils/context/authContext';
import { Provider } from 'react-redux'
import { persistor, store } from "./src/redux/store"
import { ToastProvider } from './src/utils/context/toastContext';
import { PersistGate } from 'redux-persist/integration/react';
import {SocketProvider} from "./src/utils/context/socketContext"
import { requestUserPermission, getFcmToken, notificationListener } from "./src/utils/notification/notificationService"


export default function App() {
  
  useEffect(() => {
      requestUserPermission()
      getFcmToken()
      notificationListener()
  },[])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AuthProvider>
            <DrawerProvider>
              <SocketProvider>
              <NavigationContainer >
                <Navigation />
              </NavigationContainer>
                  </SocketProvider>
            </DrawerProvider>
          </AuthProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  )
}