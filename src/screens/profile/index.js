import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {styles} from './styles'
import Header from "../../components/header"
import { BellIcon } from "../../assets/Icons/svg/bell";
import OrdersIcon from "../../assets/Icons/svg/order";
import {LocationIcon} from '../../assets/Icons/svg/locationIcon'
import PrivacyIcon from '../../assets/Icons/svg/privacyIcon'
import HelpSupportIcon from '../../assets/Icons/svg/helpSupport'
import Faq from '../../assets/Icons/svg/faq'
import Rate from '../../assets/Icons/svg/rate'
import { ProfileIcon } from "../../assets/Icons/svg/profile";
import appColors from "../../theme/appColors";
import {LogOutIcon} from '../../assets/Icons/svg/logOut'
// ==== MENU ITEM COMPONENT ====
const MenuItem = ({ icon, label, onPress, isLast , screen }) => (
  <TouchableOpacity 
    style={[styles.menuItem, isLast && { marginBottom: 0 ,borderWidth:0}]} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.menuText}>{label}</Text>
    <View style={styles.chevron} />
  </TouchableOpacity>
);


// ==== MAIN SCREEN ====
export default function Profile({ navigation }) {

    const handleLogout = () => {
     navigation.reset({
              index: 0,
              routes: [{ name: 'PhoneLogin' }],
            });
          }

            const handleRateApp = () => {
              Linking.openURL('market://details?id=your.package.name');
            };
          


  return (
    <SafeAreaView style={styles.container}>
      <View
      >
        <Header
          title="Profile"
          onBackPress={() => navigation.goBack()}
          onRightPress={() => navigation.navigate("Settings")}
          showNotificationIcon
          lightTheme
        />
        
       
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Menu Items */}
        <View style={styles.menuCard}>
          <MenuItem icon={<BellIcon size={18} color={appColors.blue} />} label="Notification" onPress={()=> navigation.navigate('Notification')} />
          <MenuItem icon={<OrdersIcon size={20}/>} label="Order History" onPress={() => navigation.navigate("")} />
          <MenuItem icon={<LocationIcon />} label="Manage Address" onPress={() => navigation.navigate("ManageAddress")} />
        </View>
        
        <View style={styles.menuCard}>
          <MenuItem icon={<HelpSupportIcon />} label="Contact Support"  onPress={() => navigation.navigate("ContactSupport")}/>
          <MenuItem icon={<ProfileIcon size={17}/>} label="About Us" onPress={()=> navigation.navigate("AboutUs")} /> 
          <MenuItem icon={<PrivacyIcon />} label="Privacy Policy" onPress={() => navigation.navigate("PrivacyPolicy")}/>
          <MenuItem icon={<Faq />} label="Faq" onPress={() => navigation.navigate("Faqs")}/>
          <MenuItem icon={<Rate />} label="Rate Us" isLast onPress={() => handleRateApp()} />
        </View>
  
     <TouchableOpacity onPress={()=> handleLogout()} style={styles.signOutBtn} activeOpacity={0.8}>
           
          <Text style={styles.signOutText}>Sign Out</Text>
           <LogOutIcon/>
          <View/>
        </TouchableOpacity>
        {/* Sign Out Button */}
      
      </ScrollView>
   
    </SafeAreaView>
  );
}