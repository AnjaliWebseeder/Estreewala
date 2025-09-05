import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from './styles';
import appColors from "../../theme/appColors";
import { useNavigation } from '@react-navigation/native';

const CustomDrawerContent = (props) => {
  const userPhoneNumber = "+1234567890"; // Replace with actual user phone number
  const handleRateApp = () => {
    Linking.openURL('market://details?id=your.package.name');
  };

    const navigation = useNavigation(); // Use the actual navigation object

    const handleLogout = () => {
   props.navigation.closeDrawer();
     navigation.reset({
              index: 0,
              routes: [{ name: 'PhoneLogin' }],
            });
          }


  return (
    <View style={styles.container}>
      {/* Simple Welcome Section */}
      <View style={styles.welcomeSection}>
        <Icon name="shirt-outline" size={40} color={appColors.blue} />
        <Text style={styles.welcomeText}>Estreewala</Text>
        <Text style={styles.phoneText}>{userPhoneNumber}</Text>
      </View>
     
      {/* Main Navigation */}
      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("Main");
          }}
        >
          <Icon name="home-outline" size={20} color={appColors.blue} />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("OrderHistory");
          }}
        >
          <Icon name="document-text-outline" size={20} color={appColors.blue} />
          <Text style={styles.menuText}>My Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
        navigation.navigate("ManageAddress");
         console.log(  navigation)
          }}
        >
          <Icon name="location-outline" size={20} color={appColors.blue} />
          <Text style={styles.menuText}>My Addresses</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("Notification");
          }}
        >
          <Icon name="notifications-outline" size={20} color={appColors.blue} />
          <Text style={styles.menuText}>Notifications</Text>
          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>3</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Support & Information */}
      <View style={styles.supportSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("ContactSupport");
          }}
        >
          <Icon name="help-circle-outline" size={20} color={appColors.blue}/>
          <Text style={styles.menuText}>Help Center</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("PrivacyPolicy");
          }}
        >
          <Icon name="shield-checkmark-outline" size={20} color={appColors.blue}/>
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
           props.navigation.closeDrawer();
           navigation.navigate("AboutUs");
          }}
        >
          <Icon name="information-circle-outline" size={20} color={appColors.blue}/>
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={handleRateApp}
        >
          <Icon name="star-outline" size={16} color={appColors.blue} />
          <Text style={styles.menuText}>Rate Our App</Text>
        </TouchableOpacity>
      </View>


     <View style={styles.serviceStatus}>
        <View style={styles.statusIndicator}>
          <View style={[styles.statusDot, styles.statusOnline]} />
          <Text style={styles.statusText}>Service Available</Text>
        </View>
        <Text style={styles.statusSubText}>Open 24/7 for pickups</Text>
      </View> 

      {/* Sign Out */}
      <View style={{flex:1}}/>
      <TouchableOpacity onPress={()=> handleLogout()} style={styles.signOut}>
        <Icon name="log-out-outline" size={20} color="#E74C3C" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawerContent;