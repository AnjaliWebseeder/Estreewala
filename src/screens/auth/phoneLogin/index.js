import React, { useState } from 'react';
import {  ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../../components/auth/authHeader';
import InputField from '../../../components/auth/inputField';
import fonts from '../../../theme/appFonts';
import appColors from '../../../theme/appColors';
import { SafeAreaView } from 'react-native-safe-area-context';

const PhoneLoginScreen = () => {
  const navigation = useNavigation();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleSendOtp = () => {
    console.log('Send OTP to:', phone);
    setIsOtpSent(true);
    // Handle OTP sending logic
  };

  const handleVerifyOtp = () => {
    console.log('Verify OTP:', otp);
    // Handle OTP verification logic
  };

  return (
<SafeAreaView style={styles.container}>
      <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <AuthHeader
        title="Phone Sign In"
        subtitle="Enter your phone number to continue"
        // logo={require('../../../assets/logo.png')}
      />

      {!isOtpSent ? (
        <>
          <InputField
            icon="call-outline"
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TouchableOpacity 
            style={[styles.submitButton, !phone && styles.disabledButton]} 
            onPress={handleSendOtp}
            disabled={!phone}
          >
            <Text style={styles.submitButtonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <InputField
            icon="keypad-outline"
            placeholder="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="number-pad"
          />

          <TouchableOpacity 
            style={[styles.submitButton, !otp && styles.disabledButton]} 
            onPress={handleVerifyOtp}
            disabled={!otp}
          >
            <Text style={styles.submitButtonText}>Verify OTP</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.resendOtp}
            onPress={handleSendOtp}
          >
            <Text style={styles.resendOtpText}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      )}

     
    </ScrollView>
</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.white,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 40,
  },
  submitButton: {
    backgroundColor: appColors.blue,
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: appColors.white,
    fontFamily: fonts.PoppinsSemiBold,
    fontSize: 16,
  },
  resendOtp: {
    alignSelf: 'center',
    marginBottom: 24,
  },
  resendOtpText: {
    fontFamily: fonts.PoppinsMedium,
    color: appColors.blue,
    fontSize: 14,
  },
});

export default PhoneLoginScreen;