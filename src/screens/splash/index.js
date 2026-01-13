import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from "react-native-fast-image";
import { styles } from "./styles";
import { appLogo } from "../../utils/images/images";

export default function Splash({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const bubbleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.elastic(1.1),
        useNativeDriver: true,
      }),
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ),
    ]).start();
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(bubbleAnim, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);


  const navigateNext = async () => {
    try {
      const isFirstLaunch = await AsyncStorage.getItem("alreadyLaunched");
      const userToken = await AsyncStorage.getItem("userToken");

      if (isFirstLaunch === null) {
        await AsyncStorage.setItem("alreadyLaunched", "true");
        navigation.replace("OnBoarding");
      } else if (userToken) {
        navigation.replace("Main");
      } else {
        navigation.replace("PhoneLogin");
      }
    } catch (err) {
      navigation.replace("PhoneLogin");
    }
  };

  useEffect(() => {
    const timer = setTimeout(navigateNext, 1800);
    return () => clearTimeout(timer);
  }, []);

  const bubbleTranslateY = bubbleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20],
  });

  const bubbleOpacity = bubbleAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1],
  });

  return (
    <View style={styles.container}>
      {/* Background bubbles */}
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
          { opacity: bubbleOpacity },
        ]}
      />

      {/* Logo */}
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
                  outputRange: [0, -8],
                }),
              },
            ],
          },
        ]}
      >
        <FastImage source={appLogo} style={styles.image} />
      </Animated.View>

      {/* Text */}
      <Animated.Text style={[styles.welcome, { opacity: fadeAnim }]}>
        WELCOME TO
      </Animated.Text>

      <Animated.Text style={[styles.appName, { opacity: fadeAnim }]}>
        ESTREEWALLA
      </Animated.Text>
    </View>
  );
}
