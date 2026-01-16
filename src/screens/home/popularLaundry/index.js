import { View, Text, FlatList, Image, TouchableOpacity, Alert, Platform, Linking, AppState } from "react-native";
import { washingWash, ironinWash } from "../../../utils/images/images";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from './styles';
import React, { useEffect, useCallback, useState } from 'react';
import { clearVendors, getNearbyVendors } from "../../../redux/slices/nearByVendor";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from "../../../utils/context/authContext";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from "react-native";

const randomImages = [washingWash, ironinWash];

const PopularLaundry = (props) => {
  const dispatch = useDispatch();
  const { userLocation, saveLocation } = useAuth();
  const { addresses } = useSelector(state => state.address);
  const { vendors, vendorsError } = useSelector(state => state.nearByVendor);
  const [loadingVendors, setLoadingVendors] = useState(true);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);


  console.log("userLocation", userLocation);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", async state => {
      if (state === "active") {
        const granted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );

        if (granted) {
          setLocationPermissionDenied(false);
          handleAutoLocation(); 
        }
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!userLocation?.coordinates?.length) return;
    if (locationPermissionDenied) return;

    fetchVendors();
  }, [userLocation, locationPermissionDenied]);


  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') return true;

    const result = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );

    switch (result) {
      case PermissionsAndroid.RESULTS.GRANTED:
        setLocationPermissionDenied(false);
        return true;

      case PermissionsAndroid.RESULTS.DENIED:
        // ❌ User said "Don't allow" (can ask again)
        setLocationPermissionDenied(true);
        return false;

      case PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN:
        // 🚨 User ticked "Don't ask again"
        setLocationPermissionDenied(true);
        Alert.alert(
          "Location Required",
          "Please enable location from settings to see nearby laundries",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Open Settings", onPress: () => Linking.openSettings() }
          ]
        );
        return false;

      default:
        setLocationPermissionDenied(true);
        return false;
    }
  };



  const reverseGeocode = async (lat, lng) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'LaundryApp/1.0',
          Accept: 'application/json',
        },
      }
    );
    return res.json();
  };

  const parseAddress = data => {
    const addr = data?.address || {};

    return {
      city: addr.city || addr.town || addr.village || '',
      state: addr.state || '',
      pincode: addr.postcode || '',
    };
  };

  const handleAutoLocation = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        await saveLocation(null);
        return;
      }
      return new Promise(resolve => {
        Geolocation.getCurrentPosition(
          async ({ coords }) => {
            const geoData = await reverseGeocode(
              coords.latitude,
              coords.longitude
            );

            const parsed = parseAddress(geoData);

            if (!parsed.city || !parsed.state || !parsed.pincode) {
              console.log('❌ Incomplete address');
              return resolve(null);
            }

            const locationData = {
              coordinates: [coords.longitude, coords.latitude],
              city: parsed.city,
              state: parsed.state,
              pincode: parsed.pincode,
            };

            // ✅ ONLY THIS IS NEEDED
            await saveLocation(locationData);

            resolve(locationData);
          },
          error => {
            console.log('📍 Location error:', error);
            resolve(null);
          },
          { enableHighAccuracy: true, timeout: 10000 }
        );
      });
    } catch (e) {
      console.log('❌ Auto address failed:', e);
      return null;
    }
  };



  // User click kare enable location
  const handleEnableLocation = async () => {
    await handleAutoLocation();
  };

  // Fetch vendors when coordinates available
  const fetchVendors = useCallback(() => {
    if (!userLocation?.coordinates?.length) return;
    if (locationPermissionDenied) return;

    dispatch(
      getNearbyVendors({
        lat: userLocation.coordinates[1],
        lng: userLocation.coordinates[0],
      })
    );
  }, [userLocation, locationPermissionDenied]);

  const popularVendors = vendors.slice(0, 3).map((vendor, index) => ({
    id: vendor.id,
    name: vendor.businessName,
    location: vendor.address,
    time: "9:00 AM - 11:00 PM",
    image: randomImages[index % randomImages.length],
  }));

  return (
    <View style={styles.container}>

      {!userLocation || locationPermissionDenied ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ justifyContent: 'center', alignItems: 'center' }}
            onPress={handleEnableLocation}
            activeOpacity={0.7}
          >
            <Ionicons name="location-outline" size={50} color="#07172cff" />
            <Text style={[styles.emptyText, { marginTop: 10, textAlign: 'center' }]}>
              Please enable location to see nearby laundries
            </Text>
          </TouchableOpacity>

          {/* {loadingVendors && (
            <Text style={{ marginTop: 10, color: '#07172cff' }}>
              Fetching nearby vendors...
            </Text>
          )} */}

        </View>
      ) : (
        <>
          <View style={styles.header}>

            <Text style={styles.title}>Popular Laundry</Text>
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('LaundryServiceList', {
                  serviceName: "Popular Laundry",
                })
              }
              style={styles.viewAllButton}
            >
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={popularVendors}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('LaundryService', {
                    title: item.name,
                    vendorId: item.id,
                    address: item.location,
                  })
                }
                activeOpacity={0.9}
                style={styles.card}
              >
                <View style={styles.imageContainer}>
                  <Image source={item.image} style={styles.image} />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.name}>{item.name}</Text>

                  <View style={styles.locationContainer}>
                    <Ionicons name="location-outline" size={14} color="#07172cff" />
                    <Text style={styles.location} numberOfLines={1}>
                      {item.location?.split(',')[0]}
                    </Text>
                  </View>

                  <View style={styles.timeContainer}>
                    <Ionicons name="time-outline" size={14} color="#07172cff" />
                    <Text style={styles.time}>{item.time}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  No popular laundries available
                </Text>
              </View>
            }
          />
        </>
      )}

      {vendorsError && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{vendorsError}</Text>
        </View>
      )}
    </View>
  );
};

export default PopularLaundry;
