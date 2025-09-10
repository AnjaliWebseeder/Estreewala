import { View, Text, Animated, Easing } from "react-native";
import React, { useEffect, useRef } from "react";
import { styles } from "./styles";
import { LaundryIcon } from "../../assets/Icons/svg/laundry";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

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

 // Navigation Logic - SIMPLIFIED
  useEffect(() => {
    const checkAppFlow = async () => {
      try {
        const isFirstLaunch = await AsyncStorage.getItem("alreadyLaunched");
        const userToken = await AsyncStorage.getItem("userToken");

        setTimeout(() => {
          if (isFirstLaunch === null) {
            // First time user - go to onboarding
            AsyncStorage.setItem("alreadyLaunched", "true");
            navigation.replace("OnBoarding");
          } else if (userToken) {
            // User is logged in - go directly to Main
            navigation.replace("Main");
          } else {
            // Returning user but not logged in - go to SignIn
            navigation.replace("SignIn");
          }
        }, 2000);
      } catch (error) {
        console.log("Splash error:", error);
        navigation.replace("SignIn");
      }
    };

    checkAppFlow();
  }, [navigation]);

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
        <LaundryIcon width={70} height={70} />
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
