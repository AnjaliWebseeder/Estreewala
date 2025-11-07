import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  PermissionsAndroid,
  Platform,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import Geolocation from 'react-native-geolocation-service';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useAuth } from '../../../utils/context/authContext';
import { styles } from './styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import appColors from '../../../theme/appColors';
import { useDispatch, useSelector } from 'react-redux';
import { placeOrder } from '../../../redux/slices/orderSlice';
import moment from 'moment';
import { setSelectedAddress } from '../../../redux/slices/addressSlice';
import { clearCart } from '../../../redux/slices/cartSlice';
import CustomToast from '../../../components/customToast';
import { useToast } from '../../../utils/context/toastContext';

const { width, height } = Dimensions.get('window');

const UserDetailsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  // const { location } = route.params || {};
  const { showToast } = useToast();

  const {
    vendorId,
    pickupDate,
    selectedDropDate,
    pickupSlot,
    paymentMethod,
    note,
    location,
    // address: selectedAddress,
    editingAddress,
    tooltipVisible,
    tooltipText,
    showScheduleOptions,
  } = route.params || {};

  // console.log('find selectedDropDate  by route in UserDetailsScreen ===>>', selectedDropDate);

  const cartItems = useSelector(state => state.cart.items);

  const totalPrice = Object.keys(cartItems).reduce((sum, key) => {
    const item = cartItems[key];
    const price = item.price || 0;
    return sum + price * item.qty;
  }, 0);

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [flatNo, setFlatNo] = useState('');
  const [landmark, setLandmark] = useState('');
  const [saveAddressAs, setSaveAddressAs] = useState('Home');
  const [coords, setCoords] = useState({
    latitude: location?.latitude || 28.6139,
    longitude: location?.longitude || 77.209,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState({});
  const [mapModalVisible, setMapModalVisible] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [showAddressList, setShowAddressList] = useState(false);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [locationErrorModalVisible, setLocationErrorModalVisible] =
    useState(false);
  const [errorType, setErrorType] = useState(''); // 'permission', 'unavailable', 'general'
  const [errorMessage, setErrorMessage] = useState('');
  const webViewRef = useRef(null);
  const { saveLocation, userLocation } = useAuth();
  const [address, setAddress] = useState(userLocation?.address || '');

  // Check and request location permission
  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message:
              'This app needs access to your location to show your position on the map.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setHasLocationPermission(true);
          return true;
        } else {
          setHasLocationPermission(false);
          return false;
        }
      } else {
        // For iOS, Geolocation service handles permissions
        setHasLocationPermission(true);
        return true;
      }
    } catch (err) {
      console.warn('Permission error:', err);
      setHasLocationPermission(false);
      return false;
    }
  };

  useEffect(() => {
    initializeLocation();
    loadSavedData();
    loadSavedAddresses();
  }, []);

  const initializeLocation = async () => {
    setIsLoading(true);
    setPermissionModalVisible(false);
    // ❌ Ye line hata do
    // setLocationErrorModalVisible(false);

    const hasPermission = await requestLocationPermission();

    if (hasPermission) {
      if (location?.latitude && location?.longitude) {
        setCoords({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        updateMap(location.latitude, location.longitude);
        setAddress(location.address || '');
        reverseGeocode(location.latitude, location.longitude);
        setIsLoading(false);
      } else {
        getCurrentLocation();
      }
    } else {
      handlePermissionDenied();
    }
  };

  const handlePermissionDenied = () => {
    setIsLoading(false);
    setHasLocationPermission(false);
    setErrorType('permission');
    setErrorMessage(
      'Location access is needed to find your exact position for delivery',
    );
    setPermissionModalVisible(true);
  };

  const handleLocationError = (type, message) => {
    setIsLoading(false);

    // Agar modal already open hai to dobara mat dikhao
    if (locationErrorModalVisible) return;

    setErrorType(type);
    setErrorMessage(message);
    setLocationErrorModalVisible(true);
  };

  const loadSavedAddresses = async () => {
    try {
      const addressesJson = await AsyncStorage.getItem('savedAddresses');
      if (addressesJson) {
        setSavedAddresses(JSON.parse(addressesJson));
      }
    } catch (error) {
      console.error('Error loading saved addresses:', error);
    }
  };

  const getCurrentLocation = () => {
    setIsLoading(true);

    Geolocation.getCurrentPosition(
      pos => {
        const { latitude, longitude } = pos.coords;
        setCoords({ latitude, longitude });
        updateMap(latitude, longitude);
        reverseGeocode(latitude, longitude);
        setIsLoading(false);
        setHasLocationPermission(true);
        setPermissionModalVisible(false);
        setLocationErrorModalVisible(false);
      },
      error => {
        console.log('Location error:', error);
        setIsLoading(false);

        // Handle different error scenarios with custom modals
        if (error.code === error.PERMISSION_DENIED) {
          handleLocationError(
            'permission',
            'Location access was denied. Please enable location permissions in settings.',
          );
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          handleLocationError(
            'unavailable',
            'Unable to retrieve your location. Please check your GPS and internet connection.',
          );
        } else if (error.code === error.TIMEOUT) {
          handleLocationError(
            'timeout',
            'Location request timed out. Please check your connection and try again.',
          );
        } else {
          handleLocationError(
            'general',
            'Could not fetch your location. Please try again.',
          );
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 10,
      },
    );
  };

  const reverseGeocode = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0 (your@email.com)',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      const data = await response.json();

      if (data && data.display_name) {
        setAddress(data.display_name);

        const suggestions = [
          data.display_name,
          `${data.address.road || ''}, ${
            data.address.suburb || data.address.city_district || ''
          }`,
          `${data.address.neighbourhood || data.address.suburb || ''}, ${
            data.address.city || data.address.town || ''
          }`,
        ].filter(addr => addr.trim() !== '');

        setAddressSuggestions(suggestions);
      } else {
        setAddress(`Location: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      setAddress(`Near coordinates: ${lat.toFixed(6)}, ${lng.toFixed(6)}`);
    }
  };

  const loadSavedData = async () => {
    try {
      const userData = await AsyncStorage.getItem('userInfo');
      if (userData) {
        const parsedData = JSON.parse(userData);
        setName(parsedData.name || '');
        setMobile(parsedData.mobile || '');
        setEmail(parsedData.email || '');
        setFlatNo(parsedData.flatNo || '');
        setLandmark(parsedData.landmark || '');
        setSaveAddressAs(parsedData.saveAddressAs || 'Home');
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
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

    if (!name.trim()) {
      newErrors.name = 'Full Name is required';
    }

    if (!mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(mobile.trim())) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    if (!address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (email.trim() && !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSave = async () => {
  //   if (!validateForm()) return;

  //   const userData = {
  //     name,
  //     mobile,
  //     email,
  //     address,
  //     flatNo,
  //     landmark,
  //     saveAddressAs,
  //     latitude: coords.latitude,
  //     longitude: coords.longitude,
  //   };

  //   try {
  //     await AsyncStorage.setItem('userInfo', JSON.stringify(userData));

  //     const addressToSave = {
  //       id: Date.now().toString(),
  //       type: saveAddressAs,
  //       address: `${flatNo ? flatNo + ', ' : ''}${address}${
  //         landmark ? ', Near ' + landmark : ''
  //       }`,
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //       createdAt: new Date().toISOString(),
  //     };

  //     const updatedAddresses = [
  //       ...savedAddresses.filter(addr => addr.type !== saveAddressAs),
  //       addressToSave,
  //     ];
  //     await AsyncStorage.setItem(
  //       'savedAddresses',
  //       JSON.stringify(updatedAddresses),
  //     );
  //     setSavedAddresses(updatedAddresses);

  //     await saveLocation({
  //       latitude: coords.latitude,
  //       longitude: coords.longitude,
  //       address: address,
  //     });

  //     navigation.replace('OrderConfirmation');
  //   } catch (err) {
  //     console.error('Error saving user info:', err);
  //     Alert.alert('Error', 'Failed to save information. Please try again.');
  //   }
  // };

  const handleSave = async () => {
    try {
      // 🔹 Validate user form before proceeding
      if (!validateForm()) return;

      // 🔹 Ensure pickup & delivery dates are valid and backend-safe
      const pickup = moment(pickupDate).isValid()
        ? moment(pickupDate)
        : moment().add(1, 'days');

      // 🔹 Use route param selectedDropDate if valid, otherwise default +2 days
      const deliveryMoment = moment(selectedDropDate).isValid()
        ? moment(selectedDropDate)
        : pickup.clone().add(2, 'days');

      // 🔹 Build full address dynamically
      const fullAddress = address
        ? `${flatNo ? flatNo + ', ' : ''}${address}${
            landmark ? ', Near ' + landmark : ''
          }`
        : `${flatNo || '123'}, MG Road, Bangalore, Karnataka 560001`;

      // 🔹 Extract pickup start time from slot and convert to 24-hour format
      const rawPickupTime = pickupSlot?.time || '09:00 AM';
      const pickupStartTime = moment(rawPickupTime.split('-')[0].trim(), [
        'hh:mm A',
        'HH:mm',
      ]).format('HH:mm');

      console.log('🕓 pickup full:', pickup.format('YYYY-MM-DD HH:mm'));
      console.log(
        '🕓 delivery full:',
        deliveryMoment.format('YYYY-MM-DD HH:mm'),
      );
      console.log('pickupTime (raw):', rawPickupTime);
      console.log('pickupTime (parsed):', pickupStartTime);

      // 🔹 Construct final payload
      const orderPayload = {
        vendorId: vendorId || '',
        items: Object.keys(cartItems).map(key => ({
          item: key,
          category: cartItems[key].category || 'man',
          service: cartItems[key].service || '',
          quantity: cartItems[key].qty || 1,
        })),
        totalPrice: totalPrice || 0,

        // ✅ Dates & times
        pickupDate: pickup.format('YYYY-MM-DD'),
        pickupTime: pickupStartTime, // ✅ Now "10:00" format

        deliveryDate: deliveryMoment.format('YYYY-MM-DD'),
        deliveryTime: deliveryMoment.format('HH:mm'),

        // ✅ Notes & instructions
        instructions: note || 'optional',

        // ✅ Address info
        address: fullAddress,
        coordinates: {
          type: 'Point',
          coordinates: [
            coords?.longitude || 77.5946, // [longitude, latitude]
            coords?.latitude || 12.9716,
          ],
        },
        house: flatNo || '',
        landmark: landmark || '',
        contactDetails: {
          fullName: name || 'Guest User',
          mobile: mobile || '',
          email: email || '',
        },
        // paymentMethod: paymentMethod || 'cash',
      };

      console.log(
        '🧾 FINAL ORDER PAYLOAD ===>>>',
        JSON.stringify(orderPayload, null, 2),
      );

      // 🔹 Dispatch API call
      const result = await dispatch(placeOrder(orderPayload)).unwrap();

      // ✅ CLEAR CART AFTER SUCCESS
      dispatch(clearCart());

      // ✅ Show toast dynamically
      showToast(result?.message || 'Order placed successfully!', 'success');

      navigation.replace('OrderConfirmation', { orderData: result });
    } catch (error) {
      console.error('❌ Error placing order:', error);
      Alert.alert('Error', error?.message || 'Failed to place order');
    }
  };

  // Custom Modal Components
  const PermissionModal = () => (
    <Modal
      visible={permissionModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setPermissionModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.customModalContainer}>
          <View style={styles.modalIconContainer}>
            <Icon name="location-off" size={50} color={appColors.orange} />
          </View>

          <Text style={styles.modalTitle}>Location Access Needed</Text>

          <Text style={styles.modalMessage}>
            {errorMessage ||
              'We need location access to find your exact position for accurate delivery.'}
          </Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.secondaryButton]}
              onPress={() => {
                setPermissionModalVisible(false);
                setCoords({
                  latitude: 28.6139,
                  longitude: 77.209,
                });
                updateMap(28.6139, 77.209);
                setAddress('Delhi, India (Default Location)');
              }}
            >
              <Text style={styles.secondaryButtonText}>
                Use Default Location
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, styles.primaryButton]}
              onPress={initializeLocation}
            >
              <Text style={styles.primaryButtonText}>Allow Location</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const LocationErrorModal = () => (
    <Modal
      visible={locationErrorModalVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setLocationErrorModalVisible(false)}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.customModalContainer}>
          <View style={styles.modalIconContainer}>
            <Icon
              name={errorType === 'unavailable' ? 'gps-off' : 'error-outline'}
              size={50}
              color={appColors.orange}
            />
          </View>

          <Text style={styles.modalTitle}>
            {errorType === 'permission'
              ? 'Location Access Denied'
              : errorType === 'unavailable'
              ? 'Location Unavailable'
              : 'Location Error'}
          </Text>

          <Text style={styles.modalMessage}>{errorMessage}</Text>

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.primaryButton]}
              onPress={() => {
                setLocationErrorModalVisible(false);
                setTimeout(() => {
                  getCurrentLocation();
                }, 300); // thoda delay dene se safe re-render hoga
              }}
            >
              <Text style={styles.primaryButtonText}>Try Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  // Radio button component
  const RadioButton = ({ selected, onPress, label, value }) => (
    <TouchableOpacity style={styles.radioOption} onPress={() => onPress(value)}>
      <View style={styles.radioCircle}>
        {selected && <View style={styles.selectedRb} />}
      </View>
      <Text style={styles.radioText}>{label}</Text>
    </TouchableOpacity>
  );

  // Map HTML
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

          const customIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="width: 20px; height: 20px; border-radius: 50%;"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });

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

            {/* Current Location Button */}
            <TouchableOpacity
              style={styles.currentLocationButton}
              onPress={getCurrentLocation}
            >
              <Icon name="my-location" size={20} color={appColors.blue} />
            </TouchableOpacity>
          </View>

          {/* Form Section */}
          <ScrollView
            style={styles.formContainer}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.sectionTitle}>Delivery Address</Text>

            {/* Address Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Address *</Text>
              <View style={styles.inputWithIcon}>
                <TextInput
                  style={[
                    styles.input,
                    errors.address && styles.inputError,
                    { paddingRight: 40 },
                  ]}
                  placeholder="Enter your complete address"
                  placeholderTextColor={appColors.font}
                  value={address}
                  onChangeText={text => {
                    setAddress(text);
                    setErrors({ ...errors, address: null });
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
              {errors.address && (
                <Text style={styles.errorText}>{errors.address}</Text>
              )}
            </View>

            {/* Flat/House No */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Flat / House No</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g. B-102, Sunrise Apartments"
                placeholderTextColor={appColors.border}
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
                placeholderTextColor={appColors.border}
                value={landmark}
                onChangeText={setLandmark}
              />
            </View>

            {/* Save Address As */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Save Address As</Text>
              <View style={styles.radioGroup}>
                <RadioButton
                  selected={saveAddressAs === 'Home'}
                  onPress={setSaveAddressAs}
                  label="Home"
                  value="Home"
                />
                <RadioButton
                  selected={saveAddressAs === 'Work'}
                  onPress={setSaveAddressAs}
                  label="Work"
                  value="Work"
                />
                <RadioButton
                  selected={saveAddressAs === 'Other'}
                  onPress={setSaveAddressAs}
                  label="Other"
                  value="Other"
                />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Contact Details</Text>

            {/* Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="Your name"
                placeholderTextColor={appColors.border}
                value={name}
                onChangeText={text => {
                  setName(text);
                  setErrors({ ...errors, name: null });
                }}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Mobile */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Mobile Number *</Text>
              <TextInput
                style={[styles.input, errors.mobile && styles.inputError]}
                placeholder="10-digit mobile number"
                placeholderTextColor={appColors.border}
                value={mobile}
                onChangeText={text => {
                  setMobile(text);
                  setErrors({ ...errors, mobile: null });
                }}
                keyboardType="phone-pad"
                maxLength={10}
              />
              {errors.mobile && (
                <Text style={styles.errorText}>{errors.mobile}</Text>
              )}
            </View>

            {/* Email */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email (Optional)</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Your email address"
                placeholderTextColor={appColors.border}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                  setErrors({ ...errors, email: null });
                }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Save Button */}
            <TouchableOpacity style={styles.button} onPress={handleSave}>
              <Text style={styles.buttonText}>Save & Continue</Text>
            </TouchableOpacity>
          </ScrollView>
        </>
      )}

      {/* Custom Modals */}
      <PermissionModal />
      <LocationErrorModal />

      {/* Map Modal */}
      <Modal
        visible={mapModalVisible}
        animationType="slide"
        onRequestClose={() => setMapModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setMapModalVisible(false)}>
              <Icon name="close" size={24} color={appColors.darkBlue} />
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
