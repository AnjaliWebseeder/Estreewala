import React, { useState, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Splash from '../screens/splash';
import OnBoarding from '../screens/onBoarding';
import PhoneLogin from '../screens/auth/phoneLogin';
import SetLocation from '../screens/location/setLocation';
import ConfirmLocation from '../screens/location/confirmLocation';
import SearchLocationScreen from '../screens/location/searchLocation';
import BottomTab from '../navigation/bottomTab';
import Notification from '../screens/settings/notification';
import CustomDrawerContent from '../navigation/customDrawer';
import SimpleDrawer from '../navigation/customDrawer/simpleDrawer';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigationRef = useRef();

  // Function to handle navigation from drawer
  const navigateFromDrawer = (screenName) => {
    setDrawerOpen(false);
    navigationRef.current?.navigate(screenName);
  };

  return (
   
    
  <>
    <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide all headers by default
        }}
      >
        {/* Main screen with custom header */}
        <Stack.Screen 
          name="Main" 
          component={BottomTab}
          options={{
            headerShown: false,
          
          }}
        />
        
        {/* Notification screen without header */}
        <Stack.Screen 
          name="Notification" 
          component={Notification}
        />
        
        {/* Add other screens as needed */}
      </Stack.Navigator>

      <SimpleDrawer 
        isOpen={drawerOpen} 
        onClose={() => setDrawerOpen(false)}
      >
        <CustomDrawerContent 
          navigation={{ 
            navigate: navigateFromDrawer,
            closeDrawer: () => setDrawerOpen(false)
          }} 
        />
      </SimpleDrawer>
  </>
  );
}