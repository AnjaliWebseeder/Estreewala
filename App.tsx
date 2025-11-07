import React from 'react'
import Navigation from './src/navigation/index'
import { NavigationContainer } from '@react-navigation/native';
import { DrawerProvider } from './src/navigation/customDrawer/drawerContext'
import { AuthProvider } from './src/utils/context/authContext';
import { Provider } from 'react-redux'
import { persistor, store } from "./src/redux/store"
import { ToastProvider } from './src/utils/context/toastContext';
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    // <Provider store={store}>
    //   <ToastProvider>
    //     <AuthProvider>
    //       <DrawerProvider>
    //         <NavigationContainer >
    //           <Navigation />
    //         </NavigationContainer>
    //       </DrawerProvider>
    //     </AuthProvider>
    //   </ToastProvider>
    // </Provider>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToastProvider>
          <AuthProvider>
            <DrawerProvider>
              <NavigationContainer >
                <Navigation />
              </NavigationContainer>
            </DrawerProvider>
          </AuthProvider>
        </ToastProvider>
      </PersistGate>
    </Provider>

  )
}