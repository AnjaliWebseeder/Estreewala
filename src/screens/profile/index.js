import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";
import { BellIcon } from "../../assets/Icons/svg/bell";
import OrdersIcon from "../../assets/Icons/svg/order";
import HelpSupportIcon from "../../assets/Icons/svg/helpSupport";
import Faq from "../../assets/Icons/svg/faq";
import Icon from "react-native-vector-icons/Ionicons";
import appColors from "../../theme/appColors";
import Header from "../../components/header";

// ==== MENU ITEM COMPONENT ====
const MenuItem = ({ icon, label, onPress, isLast }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
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
  const handleRateApp = () => {
    Linking.openURL("market://details?id=your.package.name");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
         title="Profile"
        onBackPress={() => navigation.goBack()}
        onRightPress={() => console.log("Settings pressed")}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {/* First Group */}
        <View style={styles.menuCard}>
             <MenuItem
            icon={<Icon name="lock-closed-outline" size={20} color={appColors.font} />}
            label="Login & Security"
            onPress={() => navigation.navigate("LoginSecurity")}
          />
          <MenuItem
            icon={<BellIcon size={18} color={appColors.font} />}
            label="Notification"
            onPress={() => navigation.navigate("Notification")}
          />
          {/* <MenuItem
            icon={<OrdersIcon size={20} />}
            label="Order History"
            onPress={() => navigation.navigate("")}
          /> */}
          <MenuItem
            icon={
              <Icon
                name="location-outline"
                size={20}
                color={appColors.font}
              />
            }
            label="Manage Address"
            onPress={() => navigation.navigate("ManageAddress")}
            isLast
          />
        </View>

        {/* Second Group */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<HelpSupportIcon />}
            label="Contact Support"
            onPress={() => navigation.navigate("ContactSupport")}
          />
          <MenuItem
            icon={
              <Icon
                name="information-circle-outline"
                size={20}
                color={appColors.font}
              />
            }
            label="About Us"
            onPress={() => navigation.navigate("AboutUs")}
          />
          <MenuItem
            icon={
              <Icon
                name="shield-checkmark-outline"
                size={20}
                color={appColors.font}
              />
            }
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <MenuItem
            icon={<Faq />}
            label="Faq"
            onPress={() => navigation.navigate("Faqs")}
          />
            <MenuItem
            icon={
              <Icon name="key-outline" size={18} color={appColors.font} />
            }
            label="Change Password"
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <MenuItem
            icon={
              <Icon name="star-outline" size={16} color={appColors.font} />
            }
            label="Rate Us"
            onPress={() => handleRateApp()}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
