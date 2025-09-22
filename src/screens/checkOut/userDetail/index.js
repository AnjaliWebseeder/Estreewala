import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebView from "react-native-webview";
import Geolocation from "react-native-geolocation-service";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useAuth } from '../../../utils/context/authContext';
import {styles} from './styles'
import { SafeAreaView } from "react-native-safe-area-context";
import appColors from "../../../theme/appColors";

const UserDetailsScreen = ({ navigation, route }) => {
  const { location } = route.params || {};
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [flatNo, setFlatNo] = useState("");
  const [landmark, setLandmark] = useState("");
  const [saveAddressAs, setSaveAddressAs] = useState("Home");
  const [coords, setCoords] = useState({
    latitude: location?.latitude || 28.6139,
    longitude: location?.longitude || 77.2090,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressList, setShowAddressList] = useState(false);
  const webViewRef = useRef(null);
  const { saveLocation, userLocation } = useAuth();
    const [address, setAddress] = useState(userLocation?.address || "");


  useEffect(() => {
    setIsLoading(true);
    
    if (location?.latitude && location?.longitude) {
      setCoords({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      updateMap(location.latitude, location.longitude);
      setAddress(location.address || "");
      reverseGeocode(location.latitude, location.longitude);
      setIsLoading(false);
    } else {
      getCurrentLocation();
    }
    
    loadSavedData();
    loadSavedAddresses();
  }, []);

  const loadSavedAddresses = async () => {
    try {
      const addressesJson = await AsyncStorage.getItem('savedAddresses');
      if (addressesJson) {
        setSavedAddresses(JSON.parse(addressesJson));
      }
    } catch (error) {
      console.error("Error loading saved addresses:", error);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        updateMap(latitude, longitude);
        reverseGeocode(latitude, longitude);
        setIsLoading(false);
      },
      (error) => {
        console.log("Location error:", error);
        setIsLoading(false);
        Alert.alert("Error", "Could not fetch your location. Please try again.");
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Fixed reverseGeocode function with better error handling
  const reverseGeocode = async (lat, lng) => {
    try {
      // Add a user agent header as required by Nominatim usage policy
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0 (your@email.com)' // Replace with your app info
          }
        }
      );
      
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }
      
      const data = await response.json();
      
      if (data && data.display_name) {
        setAddress(data.display_name);
        
        // Generate suggestions
        const suggestions = [
          data.display_name,
          `${data.address.road || ''}, ${data.address.suburb || data.address.city_district || ''}`,
          `${data.address.neighbourhood || data.address.suburb || ''}, ${data.address.city || data.address.town || ''}`
        ].filter(addr => addr.trim() !== '');
        
        setAddressSuggestions(suggestions);
      }
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      // Fallback to a simple address format
      setAddress(`Near coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  const loadSavedData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userInfo");
      if (userData) {
        const parsedData = JSON.parse(userData);
        setName(parsedData.name || "");
        setMobile(parsedData.mobile || "");
        setEmail(parsedData.email || "");
        setFlatNo(parsedData.flatNo || "");
        setLandmark(parsedData.landmark || "");
        setSaveAddressAs(parsedData.saveAddressAs || "Home");
      }
    } catch (error) {
      console.error("Error loading saved data:", error);
    }
  };

  const updateMap = (lat, lng) => {
    if (webViewRef.current) {
      const jsCode = `updateMap(${lat}, ${lng}); true;`;
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }
    
    if (!address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const userData = {
      name,
      mobile,
      email,
      address,
      flatNo,
      landmark,
      saveAddressAs,
      latitude: coords.latitude,
      longitude: coords.longitude,
    };

    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(userData));
      
      // Save address to the list
      const addressToSave = {
        id: Date.now().toString(),
        type: saveAddressAs,
        address: `${flatNo ? flatNo + ', ' : ''}${address}${landmark ? ', Near ' + landmark : ''}`,
        latitude: coords.latitude,
        longitude: coords.longitude,
        createdAt: new Date().toISOString()
      };
      
      const updatedAddresses = [...savedAddresses.filter(addr => addr.type !== saveAddressAs), addressToSave];
      await AsyncStorage.setItem('savedAddresses', JSON.stringify(updatedAddresses));
      setSavedAddresses(updatedAddresses);
      
      // Save to context
      await saveLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        address: address
      });

      navigation.replace("OrderConfirmation");
    } catch (err) {
      console.error("Error saving user info:", err);
      Alert.alert("Error", "Failed to save information. Please try again.");
    }
  };

  const selectSuggestion = (suggestion) => {
    setAddress(suggestion);
    setShowSuggestions(false);
  };

  const selectSavedAddress = (address) => {
    setAddress(address.address);
    setSaveAddressAs(address.type);
    setCoords({
      latitude: address.latitude,
      longitude: address.longitude
    });
    updateMap(address.latitude, address.longitude);
    setShowAddressList(false);
  };

  // Radio button component
  const RadioButton = ({ selected, onPress, label, value }) => (
    <TouchableOpacity style={styles.radioOption} onPress={() => onPress(value)}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  // Simplified map HTML
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        body { margin: 0; padding: 0; }
        #map { height: 100vh; width: 100vw; }
        .leaflet-container { background: #f8f9fa; }
        .custom-marker {
          background-color: #ff7e00;
          border: 3px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        let map, marker;

        function initMap() {
          map = L.map('map').setView([${coords.latitude}, ${coords.longitude}], 16);

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(map);

          // Custom icon
          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 20px; height: 20px; border-radius: 50%;"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

          // Marker
          marker = L.marker([${coords.latitude}, ${coords.longitude}], {
            icon: customIcon
          }).addTo(map).bindPopup('Your location').openPopup();
        }

        function updateMap(lat, lng) {
          if (map) {
            map.setView([lat, lng], 16);
            if (marker) marker.setLatLng([lat, lng]);
          }
        }

        document.addEventListener('DOMContentLoaded', initMap);
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={appColors.blue} />
          <Text style={styles.loadingText}>Finding your location...</Text>
        </View>
      ) : (
        <>
          {/* Map Section */}
          <View style={styles.mapContainer}>
            <WebView
              ref={webViewRef}
              style={styles.map}
              source={{ html: mapHtml }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadEnd={() => setIsMapLoading(false)}
              renderLoading={() => (
                <View style={styles.mapLoadingContainer}>
                  <ActivityIndicator size="large" color={appColors.blue} />
                </View>
              )}
            />
            <TouchableOpacity 
              style={styles.currentLocationButton}
              onPress={getCurrentLocation}
            >
              <Icon name="my-location" size={20} color={appColors.blue} />
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
          
              <Text style={styles.sectionTitle}>Delivery Address</Text>
             
            {/* Address Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[styles.input, errors.address && styles.inputError, { paddingRight: 40 }]}
                  placeholder="Enter your complete address"
                  placeholderTextColor={appColors.font}
                  value={address}
                  onChangeText={(text) => {
                    setAddress(text);
                    setErrors({...errors, address: null});
                    setShowSuggestions(text.length > 2);
                  }}
                  multiline
                  numberOfLines={2}
                />
                <TouchableOpacity 
                  style={styles.inputIcon}
                  onPress={() => setMapModalVisible(true)}
                >
                  <Icon name="place" size={20} color="#888" />
                </TouchableOpacity>
              </View>
              {errors.address && <Text style={styles.errorText}>{errors.address}</Text>}
            </View>

            {/* Flat/House No */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Flat / House No</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g. B-102, Sunrise Apartments"
                value={flatNo}
                onChangeText={setFlatNo}
              />
            </View>

            {/* Landmark */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Landmark (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g. Near Central Mall"
                value={landmark}
                onChangeText={setLandmark}
              />
            </View>

            {/* Save Address As */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Save Address As</Text>
              <View style={styles.radioGroup}>
                <RadioButton 
                  selected={saveAddressAs === "Home"} 
                  onPress={setSaveAddressAs}
                  label="Home" 
                  value="Home" 
                />
                <RadioButton 
                  selected={saveAddressAs === "Work"} 
                  onPress={setSaveAddressAs}
                  label="Work" 
                  value="Work" 
                />
                <RadioButton 
                  selected={saveAddressAs === "Other"} 
                  onPress={setSaveAddressAs}
                  label="Other" 
                  value="Other" 
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Contact Details</Text>
            
            {/* Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Name (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Your name"
                value={name}
                onChangeText={setName}
              />
            </View>

            {/* Mobile */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Number *</Text>
              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="10-digit mobile number"
                value={mobile}
                onChangeText={(text) => {
                  setMobile(text);
                  setErrors({...errors, mobile: null});
                }}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.mobile && <Text style={styles.errorText}>{errors.mobile}</Text>}
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email (Optional)</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Your email address"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({...errors, email: null});
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save & Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

      {/* Map Modal */}
      <Modal
        visible={mapModalVisible}
        animationType="slide"
        onRequestClose={() => setMapModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setMapModalVisible(false)}>
              <Icon name="close" size={24} color="#000" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Select Location</Text>
            <View style={styles.placeholder} />
          </View>
          <WebView
            style={styles.fullScreenMap}
            source={{ html: mapHtml }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
          <TouchableOpacity 
            style={styles.confirmLocationButton}
            onPress={() => setMapModalVisible(false)}
          >
            <Text style={styles.confirmButtonText}>Confirm Location</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default UserDetailsScreen;