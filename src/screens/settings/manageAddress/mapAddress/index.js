import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  PermissionsAndroid,
  Platform,
  StatusBar
} from 'react-native';
import WebView from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { 
  getAddresses, 
  addAddress, 
  updateAddress, 
  deleteAddress 
} from "../../../../redux/slices/addressSlice"
import Header from "../../../../components/header"
import { styles } from "./styles";
import appColors from '../../../../theme/appColors';
import {useToast} from "../../../../utils/context/toastContext"
import { useAuth } from '../../../../utils/context/authContext';

const MapAddressScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { showToast } = useToast();
  const { userLocation } = useAuth();
  const { addresses, addressesLoading } = useSelector(state => state.address);
  const { editingAddress } = route.params || {};

  const webViewRef = useRef(null);
  // State for address form
  const [addressType, setAddressType] = useState(editingAddress?.type || 'Home');
  const [addressText, setAddressText] = useState(editingAddress?.location?.address || '');
  const [isDefault, setIsDefault] = useState(editingAddress?.isDefault || false);
  
  // State for map and location - FIXED: Store coordinates as [longitude, latitude] for API
  const [coordinates, setCoordinates] = useState(() => {
    // Priority: editing address -> userLocation -> default Vadodara
    if (editingAddress?.location?.coordinates) {
      return editingAddress.location.coordinates;
    } else if (userLocation?.longitude && userLocation?.latitude) {
      return [userLocation.longitude, userLocation.latitude]; // [lng, lat] for API
    } else {
      return [73.2036246, 22.2917228]; // Default to Vadodara [lng, lat]
    }
  });
  
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  // Initialize with editing address or user location
  useEffect(() => {
    console.log("🔄 Initializing with coordinates:", coordinates);
    
    if (editingAddress) {
      setAddressType(editingAddress.type);
      setAddressText(editingAddress.location.address);
      setCoordinates(editingAddress.location.coordinates);
      setIsDefault(editingAddress.isDefault);
    } else if (userLocation?.longitude && userLocation?.latitude) {
      // Set initial coordinates from userLocation if no editing address
      setCoordinates([userLocation.longitude, userLocation.latitude]);
      setAddressText(userLocation.address || '');
    }
    
    // Request location permission
    requestLocationPermission();
  }, [editingAddress, userLocation]);

  // Request location permission
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
        } else {
          setHasLocationPermission(false);
        }
      } else {
        setHasLocationPermission(true);
      }
    } catch (err) {
      console.warn('Permission error:', err);
      setHasLocationPermission(false);
    }
  };

  // Manual reverse geocoding function - IMPROVED
  const reverseGeocodeCoordinates = async (lat, lng) => {
    if (isReverseGeocoding) return;
    
    setIsReverseGeocoding(true);
    try {
      console.log('🔍 Manual reverse geocoding:', lat, lng);
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'YourApp/1.0'
          }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data && data.display_name) {
          console.log('📫 Got address from manual geocoding:', data.display_name);
          setAddressText(data.display_name);
        } else {
          // If no proper address found, create a basic one from coordinates
          const basicAddress = `Location near ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
          setAddressText(basicAddress);
          showToast("Location Set", "Coordinates saved, you can edit the address manually", "info");
        }
      }
    } catch (error) {
      console.error('❌ Manual geocoding error:', error);
      // Fallback to coordinates if geocoding fails
      const fallbackAddress = `Location at ${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setAddressText(fallbackAddress);
    } finally {
      setIsReverseGeocoding(false);
    }
  };

  // Fixed Map HTML - Improved with better geocoding
  const getMapHtml = () => {
    // Convert coordinates from [lng, lat] to [lat, lng] for map display
    const mapLat = coordinates[1] || 22.2917228; // latitude
    const mapLng = coordinates[0] || 73.2036246; // longitude
    
    console.log("🗺️ Creating map with coordinates - Lat:", mapLat, "Lng:", mapLng);
    
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <style>
        * { margin: 0; padding: 0; }
        html, body { width: 100%; height: 100%; overflow: hidden; }
        #map { width: 100%; height: 100%; }
        .leaflet-container { background: #f8f9fa; font: inherit; }
        .custom-marker {
          background: #007bff;
          border: 3px solid #fff;
          border-radius: 50%;
          box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        .address-popup { 
          font-family: Arial, sans-serif;
          font-size: 14px;
          line-height: 1.4;
          padding: 8px;
          max-width: 300px;
        }
        .loading-spinner {
          display: inline-block;
          width: 12px;
          height: 12px;
          border: 2px solid #f3f3f3;
          border-top: 2px solid #007bff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin-left: 5px;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <script>
        let map, marker;
        let currentLat = ${mapLat};
        let currentLng = ${mapLng};
        let isInitialized = false;
        let isGeocoding = false;

        function initMap() {
          if (isInitialized) return;
          isInitialized = true;
          
          console.log('🗺️ Initializing map at - Lat:', currentLat, 'Lng:', currentLng);
          
          try {
            // Validate coordinates
            if (isNaN(currentLat) || isNaN(currentLng)) {
              throw new Error('Invalid coordinates: ' + currentLat + ', ' + currentLng);
            }

            // Initialize map
            map = L.map('map', {
              zoomControl: true,
              dragging: true,
              scrollWheelZoom: true,
              doubleClickZoom: true,
              boxZoom: true,
              keyboard: true,
              tap: true,
              touchZoom: true
            }).setView([currentLat, currentLng], 16);

            // Add tile layer
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
              maxZoom: 19,
              minZoom: 3
            }).addTo(map);

            // Create custom marker icon
            const customIcon = L.divIcon({
              className: 'custom-marker',
              html: '<div style="width: 20px; height: 20px; border-radius: 50%; background: #007bff; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>',
              iconSize: [20, 20],
              iconAnchor: [10, 10]
            });

            // Add draggable marker
            marker = L.marker([currentLat, currentLng], {
              icon: customIcon,
              draggable: true
            }).addTo(map);

            // Update popup initially
            updateMarkerPopup();

            // Handle marker drag end
            marker.on('dragstart', function(e) {
              // Show loading in popup when dragging starts
              marker.bindPopup(
                '<div class="address-popup">' +
                '<strong>📍 Moving Location</strong><br>' +
                'Lat: ' + currentLat.toFixed(6) + '<br>' +
                'Lng: ' + currentLng.toFixed(6) + '<br>' +
                '<small>Drag to new location...</small>' +
                '</div>'
              ).openPopup();
            });

            marker.on('dragend', function(e) {
              const newLatLng = e.target.getLatLng();
              currentLat = newLatLng.lat;
              currentLng = newLatLng.lng;
              
              console.log('📍 Marker dragged to - Lat:', currentLat, 'Lng:', currentLng);
              
              // Update popup immediately with new coordinates
              updateMarkerPopup();
              
              // Send coordinates in API format [lng, lat]
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'COORDINATES',
                coordinates: [currentLng, currentLat] // [lng, lat] for API
              }));
              
              // Reverse geocode new location - FIXED: Ensure this triggers
              setTimeout(() => {
                reverseGeocode(currentLat, currentLng);
              }, 300);
            });

            // Handle map click to move marker - FIXED: Improved click handling
            map.on('click', function(e) {
              const newLatLng = e.latlng;
              currentLat = newLatLng.lat;
              currentLng = newLatLng.lng;
              
              console.log('📍 Map clicked at - Lat:', currentLat, 'Lng:', currentLng);
              marker.setLatLng(newLatLng);
              
              // Update popup immediately
              updateMarkerPopup();
              
              // Send coordinates in API format [lng, lat]
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'COORDINATES',
                coordinates: [currentLng, currentLat] // [lng, lat] for API
              }));
              
              // Reverse geocode new location - FIXED: Ensure this always triggers
              setTimeout(() => {
                reverseGeocode(currentLat, currentLng);
              }, 300);
            });

            // Force map refresh
            setTimeout(function() {
              map.invalidateSize();
            }, 100);

            console.log('✅ Map initialized successfully at your location');

          } catch (error) {
            console.error('❌ Map initialization error:', error);
            // Send error to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'ERROR',
              error: error.message
            }));
          }
        }

        function updateMarkerPopup() {
          if (!marker) return;
          
          const popupContent = 
            '<div class="address-popup">' +
            '<strong>📍 Selected Location</strong><br>' +
            'Latitude: ' + currentLat.toFixed(6) + '<br>' +
            'Longitude: ' + currentLng.toFixed(6) + '<br>' +
            (isGeocoding ? '<small>Getting address... <div class="loading-spinner"></div></small>' : '<small>Drag marker or tap map to move</small>') +
            '</div>';
            
          marker.bindPopup(popupContent).openPopup();
        }

        async function reverseGeocode(lat, lng) {
          if (isGeocoding) return;
          isGeocoding = true;
          
          try {
            console.log('🔍 Reverse geocoding - Lat:', lat, 'Lng:', lng);
            
            // Show loading state in popup
            updateMarkerPopup();
            
            const response = await fetch(
              'https://nominatim.openstreetmap.org/reverse?format=json&lat=' + 
              lat + '&lon=' + lng + '&zoom=18&addressdetails=1',
              {
                headers: {
                  'User-Agent': 'YourApp/1.0'
                }
              }
            );
            
            if (response.ok) {
              const data = await response.json();
              if (data && data.display_name) {
                console.log('📫 Got address:', data.display_name);
                
                // Send address to React Native
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'ADDRESS',
                  address: data.display_name
                }));
                
                // Update popup with address
                marker.bindPopup(
                  '<div class="address-popup">' +
                  '<strong>📍 Selected Location</strong><br>' +
                  data.display_name + '<br>' +
                  '<small>Lat: ' + lat.toFixed(6) + ', Lng: ' + lng.toFixed(6) + '</small>' +
                  '</div>'
                ).openPopup();
              } else {
                // If no address found, send coordinates only
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'ADDRESS_NOT_FOUND',
                  coordinates: [lng, lat]
                }));
              }
            } else {
              // If API response not OK
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'GEOCODING_ERROR',
                coordinates: [lng, lat]
              }));
            }
          } catch (error) {
            console.error('❌ Geocoding error:', error);
            // Send error for manual handling
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'GEOCODING_ERROR',
              coordinates: [lng, lat]
            }));
          } finally {
            isGeocoding = false;
          }
        }

        function updateMapPosition(lat, lng) {
          if (!map || !marker) {
            console.log('⚠️ Map not ready for update');
            return;
          }
          
          // Validate new coordinates
          if (isNaN(lat) || isNaN(lng)) {
            console.error('❌ Invalid coordinates received:', lat, lng);
            return;
          }
          
          currentLat = lat;
          currentLng = lng;
          
          console.log('🎯 Updating map position - Lat:', lat, 'Lng:', lng);
          map.setView([lat, lng], 16);
          marker.setLatLng([lat, lng]);
          updateMarkerPopup();
          
          // Also reverse geocode the new position
          setTimeout(() => reverseGeocode(lat, lng), 500);
        }

        function setCurrentLocation(lat, lng) {
          console.log('🎯 Setting current location - Lat:', lat, 'Lng:', lng);
          updateMapPosition(lat, lng);
        }

        // Initialize map when DOM is ready
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', initMap);
        } else {
          initMap();
        }

        // Handle resize
        window.addEventListener('resize', function() {
          if (map) {
            setTimeout(() => map.invalidateSize(), 100);
          }
        });

      </script>
    </body>
    </html>
    `;
  };

  // Handle messages from WebView - IMPROVED
  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log('📨 WebView message:', data);
      
      switch (data.type) {
        case 'COORDINATES':
          // Coordinates come as [lng, lat] from map, store as [lng, lat] for API
          setCoordinates(data.coordinates);
          console.log('📍 Coordinates updated:', data.coordinates);
          // Trigger manual geocoding as fallback
          setTimeout(() => {
            reverseGeocodeCoordinates(data.coordinates[1], data.coordinates[0]);
          }, 1000);
          break;
          
        case 'ADDRESS':
          setAddressText(data.address);
          console.log('📫 Address updated:', data.address);
          break;
          
        case 'ADDRESS_NOT_FOUND':
          console.log('📍 Address not found for coordinates:', data.coordinates);
          // Use manual geocoding as fallback
          reverseGeocodeCoordinates(data.coordinates[1], data.coordinates[0]);
          break;
          
        case 'GEOCODING_ERROR':
          console.error('❌ Geocoding failed for coordinates:', data.coordinates);
          // Use manual geocoding as fallback
          reverseGeocodeCoordinates(data.coordinates[1], data.coordinates[0]);
          break;
          
        case 'ERROR':
          console.error('❌ Map error:', data.error);
          showToast("Map Error", "Failed to load map. Please try again.", "error");
          break;
      }
    } catch (error) {
      console.error('❌ Error parsing WebView message:', error);
    }
  };

  // Use current location - FIXED: Correct coordinate handling
  const useCurrentLocation = () => {
    // Use stored userLocation first (faster)
    if (userLocation?.latitude && userLocation?.longitude) {
      console.log('🎯 Using stored user location - Lat:', userLocation.latitude, 'Lng:', userLocation.longitude);
      
      // Store as [lng, lat] for API
      const newCoordinates = [userLocation.longitude, userLocation.latitude];
      setCoordinates(newCoordinates);
      
      // Send to WebView as [lat, lng] for map display
      const jsCode = `setCurrentLocation(${userLocation.latitude}, ${userLocation.longitude});`;
      webViewRef.current?.injectJavaScript(jsCode);
      
      setAddressText(userLocation.address || '');
      return;
    }

    // Fallback to GPS if no stored location
    if (!hasLocationPermission) {
      showToast("Location permission is required to use this feature", "error");
      requestLocationPermission();
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log('📍 GPS Current location - Lat:', latitude, 'Lng:', longitude);
        
        // Store as [lng, lat] for API
        const newCoordinates = [longitude, latitude];
        setCoordinates(newCoordinates);
        
        // Send to WebView as [lat, lng] for map display
        const jsCode = `setCurrentLocation(${latitude}, ${longitude});`;
        webViewRef.current?.injectJavaScript(jsCode);
        
 
      },
      (error) => {
        console.error('❌ Location error:', error);
        let errorMessage = "Unable to get current location";
        
        if (error.code === error.PERMISSION_DENIED) {
          errorMessage = "Location permission denied. Please enable in settings.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          errorMessage = "Location unavailable. Please check your GPS.";
        } else if (error.code === error.TIMEOUT) {
          errorMessage = "Location request timeout. Please try again.";
        }
        
        showToast( errorMessage, "error");
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      }
    );
  };

  // Validate form
  const validateForm = () => {
    if (!addressText.trim()) {
      return false;
    }
    return true;
  };

  // Save address
  const handleSaveAddress = async () => {
    if (!validateForm()) return;

    setIsSaving(true);

    try {
      const addressData = {
        type: addressType,
        location: {
          address: addressText, // Use the automatically updated address
          coordinates: coordinates, // [lng, lat] format for API
        },
        isDefault: isDefault,
      };

      console.log("💾 Saving address:", addressData);

      if (editingAddress) {
        // Update existing address
        await dispatch(updateAddress({ 
          id: editingAddress._id, 
          addressData 
        })).unwrap();
      } else {
        // Add new address
        await dispatch(addAddress(addressData)).unwrap();
      }

      // Navigate back
      navigation.goBack();
      
    } catch (error) {
      console.error("❌ Error saving address:", error);
      showToast("Error", error?.message || "Failed to save address", "error");
    } finally {
      setIsSaving(false);
    }
  };

  // Address type options
  const addressTypes = ['Home', 'Work', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />  
      <Header
        title={editingAddress ? "Edit Address" : "Add New Address"}
        onBackPress={() => navigation.goBack()}
      />

      {/* Map Section - Increased Height */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webViewRef}
          style={styles.map}
          source={{ html: getMapHtml() }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onMessage={handleWebViewMessage}
          onLoadEnd={() => {
            setIsMapLoading(false);
            console.log('✅ WebView loaded successfully at your location');
          }}
          onError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('❌ WebView error: ', nativeEvent);
            setIsMapLoading(false);
          }}
          onHttpError={(syntheticEvent) => {
            const { nativeEvent } = syntheticEvent;
            console.warn('❌ WebView HTTP error: ', nativeEvent);
          }}
          renderLoading={() => (
            <View style={styles.mapLoadingContainer}>
              <ActivityIndicator size="large" color={appColors.blue} />
              <Text style={styles.loadingText}>Loading map at your location...</Text>
            </View>
          )}
          startInLoadingState={true}
          mixedContentMode="compatibility"
        />

        {/* Current Location Button */}
        <TouchableOpacity
          style={styles.currentLocationButton}
          onPress={useCurrentLocation}
        >
          <Icon name="my-location" size={20} color={appColors.blue} />
        </TouchableOpacity>

        {/* Map Loading Overlay */}
        {isMapLoading && (
          <View style={styles.mapLoadingOverlay}>
            <ActivityIndicator size="large" color={appColors.blue} />
            <Text style={styles.loadingText}>Loading map at your location...</Text>
          </View>
        )}
      </View>

      {/* Address Form Section */}
      <ScrollView 
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.formContent}
      >
        <Text style={styles.sectionTitle}>Address Details</Text>

        {/* Selected Address Display */}
        <View style={styles.selectedAddressContainer}>
          <Text style={styles.selectedAddressLabel}>Selected Location:</Text>
          <Text style={styles.selectedAddressText}>
            {addressText || 'Select a location on the map by dragging the marker or tapping anywhere'}
          </Text>
          {/* <Text style={styles.coordinatesText}>
            Coordinates: {coordinates[1]?.toFixed(6) || 'N/A'} (Lat), {coordinates[0]?.toFixed(6) || 'N/A'} (Lng)
          </Text> */}
          {isReverseGeocoding && (
            <View style={styles.geocodingIndicator}>
              <ActivityIndicator size="small" color={appColors.blue} />
              <Text style={styles.geocodingText}>Updating address...</Text>
            </View>
          )}
        </View>

        {/* Address Type Selection */}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Address Type</Text>
          <View style={styles.addressTypeContainer}>
            {addressTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.addressTypeOption,
                  addressType === type && styles.addressTypeOptionSelected
                ]}
                onPress={() => setAddressType(type)}
              >
                <Text
                  style={[
                    styles.addressTypeText,
                    addressType === type && styles.addressTypeTextSelected
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Set as Default */}
        {!editingAddress?.isDefault && (
          <View style={styles.fieldContainer}>
            <TouchableOpacity
              style={styles.checkboxOption}
              onPress={() => setIsDefault(!isDefault)}
            >
              <View style={[
                styles.checkbox,
                isDefault && styles.checkboxSelected
              ]}>
                {isDefault && <Icon name="check" size={16} color="white" />}
              </View>
              <Text style={styles.checkboxText}>Set as default address</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Save Button */}
        <TouchableOpacity
          style={[
            styles.saveButton,
            (!addressText || isSaving) && styles.saveButtonDisabled
          ]}
          onPress={handleSaveAddress}
          disabled={!addressText || isSaving}
        >
          {isSaving ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.saveButtonText}>
              {editingAddress ? 'Update Address' : 'Save Address'}
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MapAddressScreen;