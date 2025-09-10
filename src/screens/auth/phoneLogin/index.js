import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Text, 
  TextInput, 
  Animated, 
  KeyboardAvoidingView, 
  Platform,
  Modal,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../../components/auth/authHeader';
import OtpInput from './otpInput/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {styles} from './styles'
import {countries} from '../../../utils/data/index'
import {useAuth} from '../../../utils/context/authContext'
const PhoneLoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [resendTimer, setResendTimer] = useState(30);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const phoneInputRef = useRef();
  const fadeAnim = useRef(new Animated.Value(0)).current;
    const {  login } = useAuth();

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

  const handleVerifyOtp =  async () => {
    console.log('Verify OTP:', otp);
      await login('user_token_here'); // Save token
    navigation.navigate('SetLocation')
    // Handle OTP verification logic
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      console.log('Resend OTP to:', selectedCountry.dialCode + phone);
      setResendTimer(30);
      // Handle resend OTP logic
    }
  };

  const selectCountry = (country) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
  };

  const renderCountryItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.countryItem}
      onPress={() => selectCountry(item)}
    >
      <Text style={styles.flag}>{item.flag}</Text>
      <Text style={styles.countryName}>{item.name}</Text>
      <Text style={styles.dialCode}>{item.dialCode}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AuthHeader
            title="Phone Sign In"
            subtitle={isOtpSent ? `Enter the OTP sent to ${selectedCountry.dialCode}${phone}` : "Enter your phone number to continue"}
          />

          {!isOtpSent ? (
            <>
              <View style={styles.phoneInputContainer}>
                <TouchableOpacity 
                  style={[styles.countryCodeContainer, focusedField === 'country' && styles.focusedInput]}
                  onPress={() => setShowCountryPicker(true)}
                  onFocus={() => setFocusedField('country')}
                  onBlur={() => setFocusedField(null)}
                >
                  <Text style={styles.flag}>{selectedCountry.flag}</Text>
                  <Text style={styles.countryCodeText}>{selectedCountry.dialCode}</Text>
                <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
                
                <TextInput
                  ref={phoneInputRef}
                  style={[styles.phoneInput, focusedField === 'phone' && styles.focusedInput]}
                  placeholder="Phone Number"
                  placeholderTextColor="#999"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>

              <TouchableOpacity 
                style={[styles.submitButton, phone.length >= 6 ? styles.activeButton : styles.inactiveButton]} 
                onPress={handleSendOtp}
                disabled={phone.length < 6}
              >
                <Text style={styles.submitButtonText}>Send OTP</Text>
              </TouchableOpacity>
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

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By continuing, you agree to our{' '}
              <Text style={styles.highlightText}>Terms of Service</Text>{' '}
              and acknowledge that you have read our{' '}
              <Text style={styles.highlightText}>Privacy Policy</Text>.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Country Picker Modal */}
      <Modal
        visible={showCountryPicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowCountryPicker(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity 
                onPress={() => setShowCountryPicker(false)}
                style={styles.closeButton}
              >
             <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={countries}
              renderItem={renderCountryItem}
              keyExtractor={item => item.code}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};



export default PhoneLoginScreen;