import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../screens/profile';
import ManageAddress from '../../screens/settings/manageAddress';
import MapAddressScreen from "../../screens/settings/manageAddress/MapAddressScreen";
import Settings from '../../screens/settings/settings';

const ProfileStackNav = createNativeStackNavigator();

export function ProfileStack() {
  return (
    <ProfileStackNav.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStackNav.Screen name="Profile" component={Profile} />
      <ProfileStackNav.Screen   name="ManageAddress" component={ManageAddress} />
    </ProfileStackNav.Navigator>
  );
}
