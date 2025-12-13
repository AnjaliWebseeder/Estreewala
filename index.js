/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// These must be at the top of your entry file
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('🌙 Background FCM:', remoteMessage);

  await notifee.displayNotification({
    title: remoteMessage.notification?.title || 'Order Update',
    body: remoteMessage.notification?.body,
    android: {
      channelId: 'default',
      pressAction: { id: 'default' },
    },
  });
});


AppRegistry.registerComponent(appName, () => App);
