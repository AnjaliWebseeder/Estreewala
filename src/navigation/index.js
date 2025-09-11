// navigation/AppNavigation.js
import React , {useRef} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../utils/context/authContext';

// Import all your screens
import Splash from '../screens/splash';
import OnBoarding from '../screens/onBoarding';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import ForgotPassword from '../screens/auth/forgotPassword';
import PhoneLogin from '../screens/auth/phoneLogin';
import OtpInput from '../screens/auth/phoneLogin/otpInput';
import SetLocation from '../otherComponent/location/setLocation';
import ConfirmLocation from '../otherComponent/location/confirmLocation';
import SearchLocation from '../otherComponent/location/searchLocation';
import BottomTab from './bottomTab';
import Notification from '../screens/settings/notification';
import CustomDrawerContent from './customDrawer';
import SimpleDrawer from './customDrawer/simpleDrawer';
import AboutUs from '../screens/settings/aboutUs';
import ContactSupport from '../screens/settings/contactSupport';
import PrivacyPolicy from '../screens/settings/privacyPolicy';
import Faqs from '../screens/settings/faq';
import ManageAddress from '../screens/settings/manageAddress';
import Settings from '../screens/settings/settings';
import { useDrawer } from './customDrawer/drawerContext';
import Search from '../otherComponent/search';
import ChangePassword from '../screens/settings/changePassword';
import LoginSecurity from '../screens/settings/userProfile';
import LaundryServiceList from '../otherComponent/home/laundryServiceList';
import LaundryService from '../otherComponent/home/laundryService';
import LaundryCheckoutScreen from '../screens/checkOut'
import OrderConfirmation from '../screens/order/orderConfirm';
import LaundryScreen from '../otherComponent/home/laundryService';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const { isOpen, closeDrawer } = useDrawer();
  const { userToken, userLocation, isLoading } = useAuth();
   const navigationRef = useRef();
   console.log("userLocation",userLocation)
  if (isLoading) {
    return null;
  }

  // Function to handle navigation from drawer
  const navigateFromDrawer = (screenName) => {
    closeDrawer();
    navigationRef.current?.navigate(screenName);
  };


  if (isLoading) {
    return <Splash />;
  }

  // Determine the initial route based on authentication and location status
  const getInitialRoute = () => {
    if (!userToken) return 'Splash';
    
    // If user is authenticated but doesn't have a location saved
    if (!userLocation) return 'SetLocation';
    
    // If user is authenticated and has a location saved
    return 'Main';
  };

  return (
   <>
     <Stack.Navigator
        initialRouteName={getInitialRoute()}
        screenOptions={{
          headerShown: false,
        }}
      >
      {userToken ? (
         
          userLocation ? (
            <>
              <Stack.Screen name="Main" component={BottomTab} />
              <Stack.Screen name="SetLocation" component={SetLocation} />
              <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} />
              <Stack.Screen name="SearchLocation" component={SearchLocation} />
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
              <Stack.Screen name="LaundryServiceList" component={LaundryServiceList} />
                 <Stack.Screen name="LaundryScreen" component={LaundryScreen} />
              <Stack.Screen name="LaundryService" component={LaundryService} />
              <Stack.Screen name="LaundryCheckoutScreen" component={LaundryCheckoutScreen} />
              <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
              
            </>
          ) : (
           
            <>
              <Stack.Screen name="SetLocation" component={SetLocation} />
              <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} />
              <Stack.Screen name="SearchLocation" component={SearchLocation} />
              <Stack.Screen name="Main" component={BottomTab} />
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
              <Stack.Screen name="LaundryServiceList" component={LaundryServiceList} />
              <Stack.Screen name="LaundryService" component={LaundryService} />
             
               
            </>
          )
        ) : (
         
          <>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="OnBoarding" component={OnBoarding} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
            <Stack.Screen name="OtpInput" component={OtpInput} />
             <Stack.Screen name="ChangePassword" component={ChangePassword} />
              <Stack.Screen name="SetLocation" component={SetLocation} />
              <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} />
          </>
        )} 
      </Stack.Navigator>

      <SimpleDrawer isOpen={isOpen} onClose={closeDrawer}>
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