import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../../components/auth/authHeader';
import InputField from '../../../components/auth/inputField';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { useAuth } from '../../../utils/context/authContext';

const SignUpScreen = ({}) => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth();

  const validatePhone = () => {
    if (!/^\d{10}$/.test(phone)) {
      Alert.alert('Invalid Phone', 'Phone number must be exactly 10 digits');
      return false;
    }
    return true;
  };

  const handleSignUp = async () => {
    if (!validatePhone()) return;

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await login('user_token_here'); // Save token
      console.log('Sign up with:', { name, email, phone, password, confirmPassword });
      navigation.navigate('SetLocation');
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <AuthHeader
          title="Create Account"
          subtitle="Join us to get started"
        />

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
        />

        {/* 📱 Phone Number Input */}
        <InputField
          icon="call-outline"
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          maxLength={10} // restrict input to 10 digits
        />

        <InputField
          icon="lock-closed-outline"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />

        <InputField
          icon="lock-closed-outline"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />

        <TouchableOpacity
          style={[
            styles.submitButton,
            (!name || !email || !phone || !password || !confirmPassword) &&
              styles.disabledButton,
          ]}
          onPress={handleSignUp}
          disabled={!name || !email || !phone || !password || !confirmPassword}
        >
          <Text style={styles.submitButtonText}>Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
