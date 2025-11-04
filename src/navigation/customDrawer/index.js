import React from "react";
import { View, Text, TouchableOpacity, Linking, ScrollView, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from './styles';
import appColors from "../../theme/appColors";
import { useNavigation } from '@react-navigation/native';
import { BellIcon } from '../../assets/Icons/svg/bell'
import HelpSupportIcon from '../../assets/Icons/svg/helpSupport'
import { useAuth } from "../../utils/context/authContext"

const CustomDrawerContent = (props) => {
  const { user, logout, userToken ,token} = useAuth(); // Using Redux hook
  const navigation = useNavigation();
  const handleRateApp = () => {
    Linking.openURL('market://details?id=your.package.name');
  };

  const handleLogout = async () => {
    try {
     props.navigation.closeDrawer();
     await logout(); // Using Redux logout action
     console.log("HANDLE LOGOUT CALL")         
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  // Handle navigation with drawer close
  const handleNavigation = (screenName, params = {}) => {
    props.navigation.closeDrawer();
    navigation.navigate(screenName, params);
  };

  return (
    <View style={[styles.container, { elevation: 5 }]}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.contentContainerStyle} 
        style={[styles.container]}
      >
        {/* User Info Section */}
        <View style={styles.welcomeSection}>
          <View style={styles.avatar}>
            <Icon name="shirt-outline" size={28} color={appColors.white} />
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.userNameText}>
              Welcome {user?.name || 'User'}
            </Text>
            <Text style={styles.detailText}>
              Customer ID: {user?.customerId || '735625674'}
            </Text>
            {user?.phone && (
              <Text style={styles.detailText}>
                Phone: {user.phone}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.main}>
          {/* Main Navigation */}
          <View style={styles.menuSection}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("Main")}
            >
              <Icon name="home-outline" size={20} color={appColors.font} />
              <Text style={styles.menuText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("Main", { screen: "Orders" })}
            >
              <Icon name="document-text-outline" size={20} color={appColors.font} />
              <Text style={styles.menuText}>My Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("ManageAddress")}
            >
              <Icon name="location-outline" size={20} color={appColors.font} />
              <Text style={styles.menuText}>My Addresses</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={() => handleNavigation("Notification")}
            >
              <BellIcon color={appColors.font}/>
              <Text style={styles.menuText}>Notifications</Text>
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
            </TouchableOpacity>

            {/* Profile Menu Item */}
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("LoginSecurity")}
            >
              <Icon name="person-outline" size={20} color={appColors.font} />
              <Text style={styles.menuText}>My Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Support & Information */}
          <View style={styles.supportSection}>
            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("ContactSupport")}
            >
              <HelpSupportIcon color={appColors.font}/>
              <Text style={styles.menuText}>Contact Support</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("PrivacyPolicy")}
            >
              <Icon name="shield-checkmark-outline" size={20} color={appColors.font}/>
              <Text style={styles.menuText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("AboutUs")}
            >
              <Icon name="information-circle-outline" size={20} color={appColors.font}/>
              <Text style={styles.menuText}>About Us</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => handleNavigation("Faqs")}
            >
              <Icon name="help-circle-outline" size={20} color={appColors.font}/>
              <Text style={styles.menuText}>FAQs</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={handleRateApp}
            >
              <Icon name="star-outline" size={16} color={appColors.font} />
              <Text style={styles.menuText}>Rate Our App</Text>
            </TouchableOpacity>
          </View>

          {/* Logout Button - Only show if authenticated */}
       
            <TouchableOpacity onPress={handleLogout} style={styles.signOut}>
              <Icon name="log-out-outline" size={20} color="#E74C3C" />
              <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>
        
        </View>
      </ScrollView>
      
      {/* Service Status */}
      <View style={{ paddingHorizontal: 10 }}>
        <View style={styles.serviceStatus}>
          <View style={styles.statusIndicator}>
            <View style={[styles.statusDot, styles.statusOnline]} />
            <Text style={styles.statusText}>Service Available</Text>
          </View>
          <Text style={styles.statusSubText}>Open 24/7 for pickups</Text>
        </View> 
      </View> 
    </View>
  );
};

export default CustomDrawerContent;