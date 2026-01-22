import React, { useEffect } from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/utils/context/authContext';
import { Provider } from 'react-redux'
import { persistor, store } from "./src/redux/store"
import { ToastProvider } from './src/utils/context/toastContext';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketProvider } from "./src/utils/context/socketContext"
import { requestUserPermission, getFcmToken, notificationListener } from "./src/utils/notification/notificationService"
import notifee, { AndroidImportance } from '@notifee/react-native';
import UpdateModal from "./src/otherComponent/updateModal"
import { StatusBar } from 'react-native';

export default function App() {

  useEffect(() => {
    requestUserPermission()
    getFcmToken()
    notificationListener()
  }, [])

  useEffect(() => {
  notifee.createChannel({
    id: 'default',
    name: 'Default Notifications',
    importance: AndroidImportance.HIGH,
  });
}, []);


  return (
    <Provider store={store}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#07172cff"
      />

      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AuthProvider>
            <SocketProvider>
              <UpdateModal />
              <NavigationContainer >
                <Navigation />
              </NavigationContainer>
            </SocketProvider>
          </AuthProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>
  )
}