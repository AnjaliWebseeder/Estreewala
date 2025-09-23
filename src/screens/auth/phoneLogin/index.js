import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  Animated, 
  KeyboardAvoidingView, 
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../../components/auth/authHeader';
import OtpInput from './otpInput/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles'
import {countries} from '../../../utils/data/index'
import {useAuth} from '../../../utils/context/authContext'
import appColors from '../../../theme/appColors';
import CheckBox from "react-native-vector-icons/Ionicons"

const PhoneLoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isChecked, setIsChecked] = useState(false);
  const phoneInputRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
    const {  login , isFirstLaunch , userLocation } = useAuth();

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (isOtpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, resendTimer]);

  const handleSendOtp = () => {
    console.log('Send OTP to:', selectedCountry.dialCode + phone);
    setIsOtpSent(true);
    setResendTimer(30);
    // Animate OTP field appearance
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleVerifyOtp = async () => {
  console.log('Verify OTP:', otp);
  try {
    await login('user_token_here'); // Save token
    
    // 3. Navigate based on first launch status
    if (isFirstLaunch) {
      // First time user - go through onboarding flow
       navigation.navigate('ConfirmLocation')
    } else {
      // Returning user - check if they have location saved
      if (userLocation) {
        // Has location - go directly to main app
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      } else {
        // No location saved - set location first
        navigation.navigate('ConfirmLocation')
      }
    }
  } catch (error) {
    console.log('Login error:', error);
    // Handle OTP verification errors (invalid OTP, etc.)
    Alert.alert('Error', 'Invalid OTP. Please try again.');
  }
};



  const handleResendOtp = () => {
    if (resendTimer === 0) {
      console.log('Resend OTP to:', selectedCountry.dialCode + phone);
      setResendTimer(30);
      // Handle resend OTP logic
    }
  };

  return (
    <SafeAreaView style={styles.container}>
   
       <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
           <View style={styles.centerView}>
            <AuthHeader
            title="Log in or Sign up"
            subtitle={isOtpSent ? `Enter the OTP sent to ${selectedCountry.dialCode}${phone}` : "Enter your phone number to continue"}
          />
          <View style={styles.mainView}>
            <View style={styles.mainContainer}/>
              {!isOtpSent ? (
            <>
               <>
    <View style={styles.phoneInputContainer}>
      <TouchableOpacity
        activeOpacity={0.9}
        style={[
          styles.countryCodeContainer,
          focusedField === 'country' && styles.focusedInput,
        ]}
        onFocus={() => setFocusedField('country')}
        onBlur={() => setFocusedField(null)}
      >
        <Text style={styles.flag}>{selectedCountry.flag}</Text>
        <Text style={styles.countryCodeText}>{selectedCountry.dialCode}</Text>
        <Ionicons name="chevron-down" size={16} color="#666" />
      </TouchableOpacity>

      <TextInput
        ref={phoneInputRef}
        style={[
          styles.phoneInput,
          focusedField === 'phone' && styles.focusedInput,
        ]}
        placeholder="Phone Number"
        placeholderTextColor="#999"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
        onFocus={() => setFocusedField('phone')}
        onBlur={() => setFocusedField(null)}
      />
    </View>

   {/* ✅ Agreement Checkbox with clickable toggle */}


 <TouchableOpacity
  style={[
    styles.submitButton,
    phone.length === 10 && isChecked
      ? styles.activeButton
      : styles.inactiveButton,
  ]}
  onPress={handleSendOtp}
  disabled={phone.length < 10 || !isChecked}
>
  <Text
    style={[
      styles.submitButtonText,
      { color: phone.length === 10 && isChecked ? appColors.white : '#7a7a7a' },
    ]}
  >
    Send OTP
  </Text>
</TouchableOpacity>

 <TouchableOpacity 
  style={styles.checkboxContainer} 
  activeOpacity={0.8} 
  onPress={() => setIsChecked(!isChecked)}  // toggle state
>
  <Ionicons
    name={isChecked ? "checkbox" : "square-outline"}
    size={18}
    color={isChecked ? appColors.primary : "#999"}
  />
  <View style={styles.termsContainer}>
       <Text style={styles.termsText}>
        I agree to the{' '}
        <Text style={styles.highlightText}>Terms of Service</Text> and{' '}
        <Text style={styles.highlightText}>Privacy Policy</Text>.
      </Text>
   
    
  </View>
</TouchableOpacity>

  </>
            </>
          ) : (
            <Animated.View style={{ opacity: fadeAnim }}>
              <OtpInput
                code={otp}
                setCode={setOtp}
                maxLength={6}
              />

              <TouchableOpacity 
                style={[styles.submitButton, otp.length === 6 ? styles.activeButton : styles.inactiveButton]} 
                onPress={handleVerifyOtp}
                disabled={otp.length !== 6}
              >
                <Text style={styles.submitButtonText}>Verify OTP</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.resendOtp, resendTimer > 0 && styles.disabledResend]}
                onPress={handleResendOtp}
                disabled={resendTimer > 0}
              >
                <Text style={styles.resendOtpText}>
                  {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : 'Resend OTP'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          )}

        
          </View>
      </View>
      </KeyboardAvoidingView> 
    </SafeAreaView>
  );
};



export default PhoneLoginScreen;