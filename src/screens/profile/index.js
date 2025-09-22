import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import appColors from "../../theme/appColors";
import Header from "../../components/header";
import { styles } from "./styles";
import { BellIcon } from "../../assets/Icons/svg/bell";
import HelpSupportIcon from "../../assets/Icons/svg/helpSupport";
import Faq from "../../assets/Icons/svg/faq";
import { windowHeight } from "../../theme/appConstant";

// ==== MENU ITEM COMPONENT ====
const MenuItem = ({ icon, label, onPress, isLast, rightComponent }) => (
  <TouchableOpacity
    style={[styles.menuItem, isLast && { borderBottomWidth: 0 }]}
    onPress={onPress}
    activeOpacity={0.7}
    disabled={!!rightComponent} // disable press if toggle present
  >
    <View style={styles.iconBox}>{icon}</View>
    <Text style={styles.menuText}>{label}</Text>
    {rightComponent ? rightComponent : <Icon name="chevron-forward" size={18} color="#999" />}
  </TouchableOpacity>
);

export default function Profile({ navigation }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [profileImage, setProfileImage] = useState(null);

  const handleRateApp = () => {
    Linking.openURL("market://details?id=your.package.name");
  };

  // Pick from gallery
  const pickImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  // Capture from camera
  const openCamera = () => {
    launchCamera({ mediaType: "photo" }, (response) => {
      if (response.didCancel) return;
      if (response.assets && response.assets.length > 0) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.main}>
        <Header iconColor={appColors.white}  titleStyle={{color:appColors.white}} onBackPress={() => navigation.goBack()} containerStyle={{  paddingVertical: windowHeight(7),}} title="My Profile" />
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image
              source={
                profileImage
                  ? { uri: profileImage }
                  : require("../../assets/images/avtar.png") // fallback
              }
              style={styles.profileImage}
            />
          </TouchableOpacity>

          <Text style={styles.userName}>Johan Smith</Text>
          <Text style={styles.userEmail}>johan.smith@example.com</Text>
        </View>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ==== USER INFO ==== */}
      

        {/* ==== First Group ==== */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<Icon name="person-outline" size={20} color={appColors.font} />}
            label="Personal Information"
            onPress={() => navigation.navigate("LoginSecurity")}
          />
          <MenuItem
            icon={<BellIcon size={18} color={appColors.font} />}
            label="Notification"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: "#ccc", true: appColors.font }}
                thumbColor={notificationsEnabled ? "#fff" : "#f4f3f4"}
              />
            }
          />
          <MenuItem
            icon={<Icon name="location-outline" size={20} color={appColors.font} />}
            label="Manage Address"
            onPress={() => navigation.navigate("ManageAddress")}
            isLast
          />
        </View>

        {/* ==== Second Group ==== */}
        <View style={styles.menuCard}>
          <MenuItem
            icon={<Icon name="key-outline" size={18} color={appColors.font} />}
            label="Change Password"
            onPress={() => navigation.navigate("ChangePassword")}
          />
          <MenuItem
            icon={<HelpSupportIcon />}
            label="Contact Support"
            onPress={() => navigation.navigate("ContactSupport")}
          />
          <MenuItem
            icon={<Icon name="information-circle-outline" size={20} color={appColors.font} />}
            label="About Us"
            onPress={() => navigation.navigate("AboutUs")}
          />
          <MenuItem
            icon={<Icon name="shield-checkmark-outline" size={20} color={appColors.font} />}
            label="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
          />
          <MenuItem
            icon={<Faq />}
            label="FAQ"
            onPress={() => navigation.navigate("Faqs")}
          />
          <MenuItem
            icon={<Icon name="star-outline" size={16} color={appColors.font} />}
            label="Rate Us"
            onPress={handleRateApp}
            isLast
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
