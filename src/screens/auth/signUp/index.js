import React, { useState } from 'react';
import {  ScrollView, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthHeader from '../../../components/auth/authHeader';
import InputField from '../../../components/auth/inputField';
import AuthFooter from '../../../components/auth/authFooter';
import { SafeAreaView } from 'react-native-safe-area-context';
import {styles} from './styles'

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Sign up with:', { name, email, password, confirmPassword });
    // Handle sign up logic
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
        // logo={require('../../../assets/logo.png')}
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
        style={[styles.submitButton, (!name || !email || !password || !confirmPassword) && styles.disabledButton]} 
        onPress={handleSignUp}
        disabled={!name || !email || !password || !confirmPassword}
      >
        <Text style={styles.submitButtonText}>Create Account</Text>
      </TouchableOpacity>

      <AuthFooter
        text="Already have an account?"
        buttonText="Sign In"
        onPress={() => navigation.navigate('SignIn')}
      />
    </ScrollView>
  </SafeAreaView>
  );
};



export default SignUpScreen;