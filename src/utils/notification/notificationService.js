import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { navigationRef } from "../../navigation/index"


export async function requestUserPermission() {
  await notifee.requestPermission(); // 🔥 REQUIRED
  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}


export async function showOrderNotification(data) {
  await notifee.displayNotification({
    title: 'Order Update',
    body: `Your order is ${data.status}`,
    android: {
      channelId: 'default',
      importance: AndroidImportance.HIGH,
      pressAction: { id: 'default' },
      smallIcon: 'ic_launcher',
    },
  });
}

export async function getFcmToken() {
  const token = await messaging().getToken();
  console.log("FCM TOKEN:", token);
  return token;
}

export function notificationListener() {

  // 🔥 FOREGROUND – SHOW NOTIFICATION MANUALLY
  messaging().onMessage(async remoteMessage => {
    console.log('📩 Foreground FCM:', remoteMessage);

    await notifee.displayNotification({
      title: remoteMessage.notification?.title || 'Order Update',
      body:
        remoteMessage.notification?.body ||
        `Your order is ${remoteMessage.data?.status}`,
      android: {
        channelId: 'default',
        importance: AndroidImportance.HIGH,
        pressAction: { id: 'default' },
        smallIcon: 'ic_launcher',
      },
    });
  });

  // 🔹 App opened from killed state
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('💀 Killed state FCM:', remoteMessage);
        navigationRef.current?.navigate('Orders');
      }
    });

  // 🔹 App opened from background
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('📲 Background FCM:', remoteMessage);
    navigationRef.current?.navigate('Orders');
  });
}





