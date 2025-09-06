import React, { useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash'
import OnBoarding from '../screens/onBoarding'
import PhoneLogin from '../screens/auth/phoneLogin'
import OtpInput from '../screens/auth/phoneLogin/otpInput';
import SetLocation from '../otherComponent/location/setLocation'
import ConfirmLocation from '../otherComponent/location/confirmLocation'
import SearchLocation from '../otherComponent/location/searchLocation'
import BottomTab from '../navigation/bottomTab';
import Notification from '../screens/settings/notification';
import CustomDrawerContent from '../navigation/customDrawer';
import SimpleDrawer from '../navigation/customDrawer/simpleDrawer';
import AboutUs from '../screens/settings/aboutUs'
import ContactSupport from '../screens/settings/contactSupport'
import PrivacyPolicy from '../screens/settings/privacyPolicy'
import Faqs from '../screens/settings/faq'
import ManageAddress from '../screens/settings/manageAddress'
import Settings from '../screens/settings/settings'
import { useDrawer } from './customDrawer/drawerContext';
import Search from '../otherComponent/search'
import SignIn from '../screens/auth/signIn'
import SignUp from '../screens/auth/signUp'
import ForgotPassword from '../screens/auth/forgotPassword'
import ChangePassword from '../screens/settings/changePassword'
import LoginSecurity from '../screens/settings/userProfile'

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const navigationRef = useRef();
  const { isOpen, closeDrawer } = useDrawer(); // Use the context

  // Function to handle navigation from drawer
  const navigateFromDrawer = (screenName) => {
    closeDrawer();
    navigationRef.current?.navigate(screenName);
  };

  return (
    <>
      <Stack.Navigator
       initialRouteName='Main'
        screenOptions={{
          headerShown: false,
        }}
      >
        
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="OnBoarding" component={OnBoarding} />
         <Stack.Screen name="SignIn" component={SignIn} />
                          <Stack.Screen name="SignUp" component={SignUp} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
                <Stack.Screen name="OtpInput" component={OtpInput} />
                  <Stack.Screen name="SetLocation" component={SetLocation} />
                    <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} />
                      <Stack.Screen name="SearchLocation" component={SearchLocation} />
                     
                  
        <Stack.Screen 
          name="Main" 
          component={BottomTab}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="AboutUs" component={AboutUs} />
        <Stack.Screen name="ContactSupport" component={ContactSupport} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
        <Stack.Screen name="Faqs" component={Faqs} />
        <Stack.Screen name="ManageAddress" component={ManageAddress} />
        <Stack.Screen name="Settings" component={Settings} />
           <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="LoginSecurity" component={LoginSecurity} />
           
           
      </Stack.Navigator>

      <SimpleDrawer 
        isOpen={isOpen} // Use context state
        onClose={closeDrawer} // Use context function
      >
        <CustomDrawerContent 
          navigation={{ 
            navigate: navigateFromDrawer,
            closeDrawer: closeDrawer
          }} 
        />
      </SimpleDrawer>
    </>
  );
}