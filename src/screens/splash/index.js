import { View, Text, Animated, Easing, Alert, Platform } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import { appLogo } from "../../utils/images/images";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';
import { useAuth } from "../../utils/context/authContext";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;
  const { saveLocation } = useAuth();

  // Animations
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, [fadeAnim, scaleAnim, bounceAnim]);

  // Bubble animation
  useEffect(() => {
    Animated.loop(
      Animated.timing(bubbleAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [bubbleAnim]);

  const bubbleTranslateY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const bubbleOpacity = bubbleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  // Request location permission
  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          // Permission denied, continue without location
          console.log('Location permission denied');
          navigateToApp();
        }
      } catch (err) {
        console.warn(err);
        navigateToApp();
      }
    } else {
      // For iOS, you might want to use a different approach
      // For now, just continue without location
      navigateToApp();
    }
  };

  // Get current location
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // Save location to context
        reverseGeocode(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error(error);
        navigateToApp();
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    );
  };

  // Reverse geocode to get address from coordinates
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
        await saveLocation({
          latitude: lat,
          longitude: lng,
          address: "Location found"
        });
        navigateToApp();
        return;
      }

      await saveLocation({
        latitude: lat,
        longitude: lng,
        address: data.display_name || "Location found"
      });
      
      navigateToApp();
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      navigateToApp();
    }
  };

  // Navigation Logic
  const navigateToApp = async () => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem("alreadyLaunched");
      const userToken = await AsyncStorage.getItem("userToken");

      if (isFirstLaunch === null) {
        AsyncStorage.setItem("alreadyLaunched", "true");
        navigation.replace("OnBoarding");
        

      } else if (userToken) {
        navigation.replace("Main");
      } else {
        navigation.replace("PhoneLogin");
      }
    } catch (error) {
      console.log("Splash error:", error);
      navigation.replace("PhoneLogin");
    }
  };

  // Request location permission on component mount
  useEffect(() => {
    const init = async () => {
      // Wait for animations to start
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Request location permission
      requestLocationPermission();
    };

    init();
  }, []);

  return (
    <View style={styles.container}>
      {/* Animated bubbles in background */}
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble1,
          { opacity: bubbleOpacity, transform: [{ translateY: bubbleTranslateY }] },
        ]}
      />
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble2,
          {
            opacity: bubbleOpacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.7, 0.3, 0.7],
            }),
            transform: [
              {
                translateY: bubbleTranslateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -15],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.bubble,
          styles.bubble3,
          {
            opacity: bubbleOpacity.interpolate({
              inputRange: [0, 0.5, 1],
              outputRange: [0.5, 0.2, 0.5],
            }),
            transform: [
              {
                translateY: bubbleTranslateY.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      />

      {/* Laundry Icon */}
      <Animated.View
        style={[
          styles.iconWrapper,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              {
                translateY: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10],
                }),
              },
            ],
          },
        ]}
      >
       <FastImage source={appLogo} style={styles.image}/>
      </Animated.View>

      {/* App Name */}
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.welcome}>WELCOME TO</Text>
      </Animated.View>

      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [30, 0],
              }),
            },
          ],
        }}
      >
        <Text style={styles.appName}>ESTREEWALA</Text>
      </Animated.View>
    </View>
  );
}