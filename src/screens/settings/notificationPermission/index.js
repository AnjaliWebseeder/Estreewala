import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { notification } from '../../../utils/images/images';
import { styles } from './styles';
import { useAuth } from '../../../utils/context/authContext';

export default function NotificationPromptScreen({ navigation }) {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);

  // Enable Notifications
  const onNotificationClick = async () => {
    setLoading(true);
    try {
      await login('user_token_here');

      // small delay to ensure navigator updates
      setTimeout(() => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }, 100);
    } catch (error) {
      setLoading(false);
      console.log('Login error:', error);
    }
  };

  // Skip notifications
  const skipClick = async () => {
   try {
      await login('user_token_here');

      // small delay to ensure navigator updates
      setTimeout(() => {
       
        navigation.reset({
          index: 0,
          routes: [{ name: 'Main' }],
        });
      }, 100);
    } catch (error) {
      console.log('Login error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={styles.container}>
        <Text style={styles.title}>
          Enable notifications to get updates{'\n'}about offers, order status and more
        </Text>

        <View style={styles.illustrationWrap}>
          <Image source={notification} style={styles.illustration} resizeMode="cover" />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onNotificationClick}
            activeOpacity={0.8}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.primaryBtnText}>Enable Notifications</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.ghostBtn}
            onPress={skipClick}
            activeOpacity={0.8}
            disabled={loading} // optional: prevent skipping while loading
          >
            <Text style={styles.ghostBtnText}>Not now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
