import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { styles } from './styles';

const CustomDrawer = (props) => {
  return (
    <View style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>Alone Musk</Text>
        <Text style={styles.userLocation}>Los Angeles, United States</Text>
      </View>

      {/* Drawer Items */}
      <View style={styles.menuSection}>
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => {
            props.navigation.closeDrawer();
            // Navigate to Profile screen if you have one
          }}
        >
          <Icon name="person-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem} 
          onPress={() => {
            props.navigation.closeDrawer();
            props.navigation.navigate("Notification");
          }}
        >
          <Icon name="notifications-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Notification</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="shield-checkmark-outline" size={22} color="#333" />
          <Text style={styles.menuText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Icon name="information-circle-outline" size={22} color="#333" />
          <Text style={styles.menuText}>About Us</Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOut}>
        <Icon name="log-out-outline" size={22} color="#E53935" />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer;