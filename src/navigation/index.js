import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../screens/splash';
import onBoarding from '../screens/onBoarding'
import SignIn from '../screens/auth/signIn'
import SignUp from '../screens/auth/signUp'
import PhoneLogin from '../screens/auth/phoneLogin';
import forgotPassword from '../screens/auth/forgotPassword'

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} /> 
      <Stack.Screen name="onBoarding" component={onBoarding} /> 
     <Stack.Screen name="SignIn" component={SignIn} />  
    <Stack.Screen name="SignUp" component={SignUp} />  
    <Stack.Screen name="PhoneLogin" component={PhoneLogin} /> 
        <Stack.Screen name="forgotPassword" component={forgotPassword} /> 

    
    </Stack.Navigator>
  )
}