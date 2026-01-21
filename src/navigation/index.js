import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../utils/context/authContext';
import { View, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import appColors from '../theme/appColors';
import fonts from '../theme/appFonts';
import { styles } from './styles';
import { windowWidth } from '../theme/appConstant';

/* ---------------- AUTH ---------------- */
import Splash from '../screens/splash';
import OnBoarding from '../screens/onBoarding';
import PhoneLogin from '../screens/auth/phoneLogin';
import OtpInput from '../screens/auth/phoneLogin/otpInput';
import SignIn from '../screens/auth/signIn';
import SignUp from '../screens/auth/signUp';
import ForgotPassword from '../screens/auth/forgotPassword';

/* ---------------- TABS ---------------- */
import { Home } from '../screens/home';
import LaundryServiceList from '../otherComponent/home/laundryServiceList';
import LaundryService from '../otherComponent/home/laundryService';
import Order from '../screens/order';
import Profile from '../screens/profile';

/* ---------------- CHECKOUT / ORDER ---------------- */
import LaundryCheckoutScreen from '../screens/checkOut';
import OrderConfirmation from '../screens/order/orderConfirm';
import OrderDetails from '../screens/order/orderDetail';
import UserDetailsScreen from '../screens/checkOut/userDetail';

/* ---------------- LOCATION ---------------- */
import SetLocation from '../otherComponent/location/setLocation';
import ConfirmLocation from '../otherComponent/location/confirmLocation';
import Search from '../otherComponent/search';
import MapAddressScreen from "../screens/settings/manageAddress/MapAddressScreen";

/* ---------------- SETTINGS / PROFILE ---------------- */
import CustomDrawerContent from './customDrawer';
import AboutUs from '../screens/settings/aboutUs';
import ContactSupport from '../screens/settings/contactSupport';
import PrivacyPolicy from '../screens/settings/privacyPolicy';
import Faqs from '../screens/settings/faq';
import TermsOfServiceScreen from '../screens/settings/termsOfService';
import ManageAddress from '../screens/settings/manageAddress';
import Notification from '../screens/settings/notification';
import ChangePassword from '../screens/settings/changePassword';
import LoginSecurity from '../screens/settings/userProfile';

/* ---------------- ICONS ---------------- */
import { HomeIcon } from '../assets/Icons/svg/home';
import { LaundryIcon } from '../assets/Icons/svg/laundriesIcon';
import OrderIcon from '../assets/Icons/svg/order';
import { ProfileIcon } from '../assets/Icons/svg/profile';

/* ---------------- NAVIGATORS ---------------- */
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

/* ---------------- MINIMAL TAB BUTTON ---------------- */
const MinimalTabButton = ({ focused, icon: IconComponent, label, labelWidth, iconStyle }) => (
  <View style={styles.minimalTabButton}>
    <View
      style={[
        styles.minimalIconContainer,
        focused && styles.minimalIconContainerActive,
        iconStyle,
      ]}
    >
      <IconComponent size={18} color={focused ? appColors.white : appColors.darkBlue} />
    </View>
    <Text
      pointerEvents="none"
      style={[
        styles.minimalTabLabel,
        {
          color: focused ? appColors.blue : appColors.subTitle,
          fontFamily: focused ? fonts.PoppinsMedium : fonts.PoppinsRegular,
          width: labelWidth,
        },
      ]}
    >
      {label}
    </Text>
  </View>
);

/* ---------------- BOTTOM TABS ---------------- */
function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: [styles.minimalTabBar, { height: 65 + insets.bottom }],
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({ focused }) => <MinimalTabButton focused={focused} icon={HomeIcon} label="Home" /> }}
      />
      <Tab.Screen
        name="Laundry"
        component={LaundryServiceList}
        options={{
          tabBarIcon: ({ focused }) => (
            <MinimalTabButton focused={focused} icon={LaundryIcon} label="Laundry" labelWidth={53} iconStyle={{ marginLeft: 5 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={Order}
        options={{ tabBarIcon: ({ focused }) => <MinimalTabButton focused={focused} icon={OrderIcon} label="Orders" /> }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ tabBarIcon: ({ focused }) => <MinimalTabButton focused={focused} icon={ProfileIcon} label="Profile" /> }}
      />
    </Tab.Navigator>
  );
}

/* ---------------- DRAWER ---------------- */
function MainDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerStyle: { width: windowWidth(350) } }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Tabs" component={BottomTabs} />
      <Drawer.Screen name="ManageAddress" component={ManageAddress} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="LoginSecurity" component={LoginSecurity} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="ContactSupport" component={ContactSupport} />
      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Drawer.Screen name="Faqs" component={Faqs} />
      <Drawer.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} />
      {/* <Drawer.Screen name="MapAddressScreen" component={MapAddressScreen} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} /> */}
    </Drawer.Navigator>
  );
}

/* ---------------- APP NAVIGATION ---------------- */
export default function AppNavigation() {
  const { userToken, isLoading } = useAuth();
  if (isLoading) return null; 

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!userToken ? (
        <>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="OnBoarding" component={OnBoarding} />
          <Stack.Screen name="PhoneLogin" component={PhoneLogin} />
          <Stack.Screen name="OtpInput" component={OtpInput} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </>
      ) : (
        <>
          <Stack.Screen name="Main" component={MainDrawer} />
          <Stack.Screen name="ManageAddress" component={ManageAddress} />
<Stack.Screen name="MapAddressScreen" component={MapAddressScreen} />
          <Stack.Screen name="LaundryService" component={LaundryService} />
          <Stack.Screen name="LaundryCheckout" component={LaundryCheckoutScreen} />
          <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
          <Stack.Screen name="OrderDetails" component={OrderDetails} />
          <Stack.Screen name="UserDetails" component={UserDetailsScreen} />
          <Stack.Screen name="SetLocation" component={SetLocation} />
          <Stack.Screen name="ConfirmLocation" component={ConfirmLocation} />
          <Stack.Screen name="Search" component={Search} />
        </>
      )}
    </Stack.Navigator>
  );
}
