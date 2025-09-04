/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
// These must be at the top of your entry file
import 'react-native-gesture-handler';


AppRegistry.registerComponent(appName, () => App);
