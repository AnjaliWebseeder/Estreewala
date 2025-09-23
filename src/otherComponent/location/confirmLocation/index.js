// otherComponent/location/confirmLocation.js
import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator,
  Alert,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import { styles } from './styles';
import appColors from '../../../theme/appColors';
import { useAuth } from '../../../utils/context/authContext';
import { useSafeAreaInsets } from "react-native-safe-area-context";


const ConfirmLocationScreen = ({ route }) => {
  const { selectedLocation } = route.params || {};
  const navigation = useNavigation();
  const { saveLocation , markAppAsLaunched , isFirstLaunch } = useAuth();
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mapLoading, setMapLoading] = useState(true);
  const webViewRef = useRef(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (selectedLocation) {
      setAddress(selectedLocation.formattedAddress || selectedLocation.name);
      setLocation({
        coords: {
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude
        }
      });
      setLoading(false);
      updateMap(selectedLocation.latitude, selectedLocation.longitude);
    } else {
      // No need to request permission here anymore - just get the location
      getCurrentLocation();
    }
  }, [selectedLocation]);

  const getCurrentLocation = () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        reverseGeocode(position.coords.latitude, position.coords.longitude);
        updateMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(error);
        setLoading(false);
        Alert.alert('Error', 'Could not get your location.');
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: {
            "User-Agent": "LaundryApp/1.0",
            "Accept": "application/json"
          }
        }
      );

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Non-JSON response:", text);
        setAddress("Location found");
        return;
      }

      setAddress(data.display_name || "Location found");
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      setAddress("Location found");
    } finally {
      setLoading(false);
    }
  };

  const updateMap = (lat, lng) => {
    if (webViewRef.current) {
      const jsCode = `
        updateMap(${lat}, ${lng});
        true;
      `;
      webViewRef.current.injectJavaScript(jsCode);
    }
  };

  const handleMapLoad = () => {
    setMapLoading(false);
    if (location) {
      updateMap(location.coords.latitude, location.coords.longitude);
    }
  };

 const handleConfirmLocation = async () => {
 if (location) {
    try {
      await saveLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: address
      });

      // Mark app as launched after location confirmation
      if (isFirstLaunch) {
        await markAppAsLaunched();
      }

      // Navigate based on first launch status
      if (isFirstLaunch) {
        navigation.navigate('NotificationPermission');
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }
    } catch (error) {
      console.error("Error saving location:", error);
      Alert.alert("Error", "Could not save your location.");
    }
  }
};


  const openInMapsApp = () => {
    if (location) {
      const { latitude, longitude } = location.coords;
      const url = Platform.select({
        ios: `maps:0,0?q=${latitude},${longitude}`,
        android: `geo:0,0?q=${latitude},${longitude}`
      });
      Linking.openURL(url);
    }
  };

  // HTML template for OpenStreetMap with Leaflet
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
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        let map, marker;
        
        function initMap() {
          map = L.map('map').setView([0, 0], 2);
          
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 19
          }).addTo(map);
        }
        
        function updateMap(lat, lng) {
          if (map) {
            map.setView([lat, lng], 15);
            
            if (marker) {
              map.removeLayer(marker);
            }
            
            marker = L.marker([lat, lng]).addTo(map)
              .bindPopup('Your Location')
              .openPopup();
          }
        }
        
        // Initialize map when page loads
        document.addEventListener('DOMContentLoaded', initMap);
      </script>
    </body>
    </html>
  `;

  return (
    <SafeAreaView style={styles.container}>
      {/* Map View with WebView */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          style={styles.map}
          source={{ html: mapHtml }}
          onLoad={handleMapLoad}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.mapLoadingContainer}>
              <ActivityIndicator size="large" color={appColors.blue} />
              <Text style={styles.mapLoadingText}>Loading map...</Text>
            </View>
          )}
        />

        {/* Current Location Button */}
        <TouchableOpacity 
          style={styles.currentLocationButton}
          onPress={getCurrentLocation}
        >
          <Icon name="locate" size={20} color={appColors.blue} />
        </TouchableOpacity>

        {/* Open in Maps App Button */}
        <TouchableOpacity 
          style={styles.openMapsButton}
          onPress={openInMapsApp}
        >
          <Icon name="map" size={20} color={appColors.blue} />
        </TouchableOpacity>
      </View>

      {/* Bottom Card with Address and Confirm Button */}
      <View style={[styles.bottomCard, { paddingBottom: insets.bottom + 12 }]}>
        <View style={styles.addressSection}>
          <Icon name="location" size={20} color={appColors.blue} style={styles.addressIcon} />
          <View style={styles.addressTextContainer}>
            <Text style={styles.addressLabel}>Your Location</Text>
            {loading ? (
              <ActivityIndicator size="small" color={appColors.blue} style={styles.loadingIndicator} />
            ) : (
              <Text style={styles.addressText} numberOfLines={2}>
                {address || 'Getting your location...'}
              </Text>
            )}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.confirmButton, loading && styles.disabled]}
          onPress={handleConfirmLocation}
          disabled={loading}
        >
          <Text style={styles.confirmText}>Confirm Location</Text>
        </TouchableOpacity>
      </View>

      {/* Map Loading Overlay */}
      {mapLoading && (
        <View style={styles.mapOverlay}>
          <ActivityIndicator size="large" color={appColors.blue} />
          <Text style={styles.mapOverlayText}>Loading map...</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ConfirmLocationScreen;