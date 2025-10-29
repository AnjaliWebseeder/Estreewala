import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  Animated, 
  KeyboardAvoidingView, 
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, verifyOtp, resetOtpState, resetVerifyState } from "../../../redux/slices/authSlice"
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../../components/auth/authHeader';
import OtpInput from './otpInput/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';
import { countries } from '../../../utils/data';
import appColors from '../../../theme/appColors';
import AuthFooter from '../../../components/auth/authFooter';
import {useToast} from "../../../utils/context/toastContext"

const PhoneLoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { 
    otpLoading, 
    otpSent, 
    verifyLoading, 
    verifySuccess, 
    isAuthenticated,
    token 
  } = useSelector(state => state.auth);
  
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isChecked, setIsChecked] = useState(false);
   const [isOtpSent, setIsOtpSent] = useState(false);
  const phoneInputRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const { showToast } = useToast();
  // Clear states when component unmounts
  useEffect(() => {
    return () => {
      dispatch(resetOtpState());
      dispatch(resetVerifyState());
    };
  }, [dispatch]);

  // Handle OTP sent state
  useEffect(() => {
    if (otpSent) {
      setIsOtpSent(true);
      setResendTimer(30);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [otpSent, fadeAnim]);

  // Handle successful verification
  useEffect(() => {
    if (verifySuccess && isAuthenticated && token) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'SetLocation' }],
      });
    }
  }, [verifySuccess, isAuthenticated, token, navigation]);

  // Handle errors
  useEffect(() => {
    // You can add error handling here if needed
  }, []);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (otpSent && resendTimer > 0) {
      timer = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [otpSent, resendTimer]);

  const handleSendOtp = async () => {
    try {
      await dispatch(sendOtp({ phone: phone })).unwrap();
    } catch (error) {
       showToast(error || 'Failed to send OTP', "error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
    
      await dispatch(verifyOtp({ phone: phone, otp })).unwrap();
    } catch (error) {
      showToast( error || 'Invalid OTP', "error");
   
    }
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      handleSendOtp();
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
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
            title="Sign in with Phone"
            subtitle={isOtpSent ? `Enter the OTP sent to ${selectedCountry.dialCode}${phone}` : "Enter your phone number to continue"}
          />
          <View style={styles.mainView}>
            <View style={styles.mainContainer}/>
            {!isOtpSent ? (
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
                    maxLength={10}
                  />
                </View>

                <TouchableOpacity
                  style={[
                    styles.submitButton,
                    phone.length === 10 && isChecked && !otpLoading
                      ? styles.activeButton
                      : styles.inactiveButton,
                  ]}
                  onPress={handleSendOtp}
                  disabled={phone.length < 10 || !isChecked || otpLoading}
                >
                  <Text
                    style={[
                      styles.submitButtonText,
                      { color: phone.length === 10 && isChecked ? appColors.white : '#7a7a7a' },
                    ]}
                  >
                    {otpLoading ? 'Sending OTP...' : 'Send OTP'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.checkboxContainer} 
                  activeOpacity={0.8} 
                  onPress={() => setIsChecked(!isChecked)}
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
                
                <AuthFooter
                  text="Don't have an account?"
                  buttonText="Sign Up"
                  onPress={() => navigation.navigate('SignUp')}
                />
              </>
            ) : (
              <Animated.View style={{ opacity: fadeAnim }}>
                <OtpInput
                  code={otp}
                  setCode={setOtp}
                  maxLength={6}
                />

                <TouchableOpacity 
                  style={[styles.submitButton, otp.length === 6 && !verifyLoading ? styles.activeButton : styles.inactiveButton]} 
                  onPress={handleVerifyOtp}
                  disabled={otp.length !== 6 || verifyLoading}
                >
                  <Text style={styles.submitButtonText}>
                    {verifyLoading ? 'Verifying...' : 'Verify OTP'}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.resendOtp, (resendTimer > 0 || otpLoading) && styles.disabledResend]}
                  onPress={handleResendOtp}
                  disabled={resendTimer > 0 || otpLoading}
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