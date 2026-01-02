import React, { useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  View,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import {
  registerCustomer,
  resetRegisterState,
} from '../../../redux/slices/authSlice';
import AuthHeader from '../../../components/auth/authHeader';
import InputField from '../../../components/auth/inputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useToast } from '../../../utils/context/toastContext';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { registerLoading, registerError, registerSuccess } = useSelector(
    state => state.auth,
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const { showToast } = useToast();

  // Clear errors when component unmounts
  React.useEffect(() => {
    return () => {
      dispatch(resetRegisterState());
    };
  }, [dispatch]);

  const validateForm = () => {
    if (!name.trim()) {
      showToast('Please enter your full name', 'error');
      return false;
    }

    if (!email.trim()) {
      showToast('Please enter your email address', 'error');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showToast('Please enter a valid email address', 'error');
      return false;
    }

    if (!phone.trim()) {
      showToast('Please enter your phone number', 'error');
      return false;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      showToast('Please enter a valid 10-digit Indian mobile number', 'error');
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(
        registerCustomer({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      ).unwrap();

      navigation.navigate('PhoneLogin');
    } catch (error) {
      showToast(error || 'Registration failed', 'error');
      console.log('Registration error:', error);
    }
  };

  const isEmailValid = /^\S+@\S+\.\S+$/.test(email.trim());
  const isPhoneValid = /^\d{10}$/.test(phone.trim());
  const isFormValid = name.trim() && isEmailValid && isPhoneValid;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />

      <KeyboardAwareScrollView
        // contentContainerStyle={styles.contentContainerStyle}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={40}
        enableOnAndroid
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <AuthHeader
            title="Sign Up"
            subtitle="Join us to get started"
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
          />

          <View style={{ marginHorizontal: 15 }}>
            <InputField
              icon="person-outline"
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />

            <InputField
              icon="mail-outline"
              placeholder="Email address"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <InputField
              icon="call-outline"
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              maxLength={10}
            />

            <TouchableOpacity
              style={[
                styles.submitButton,
                registerLoading && styles.disabledButton,
              ]}
              onPress={handleSignUp}
              disabled={registerLoading}
            >
              <Text style={styles.submitButtonText}>
                {registerLoading ? 'Creating Account...' : 'Sign Up'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
