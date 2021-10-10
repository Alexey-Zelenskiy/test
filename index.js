import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {registerRootComponent} from 'expo';

import App from './src/app';

LogBox.ignoreLogs([
  'Warning: componentWillReceiveProps',
  'Warning: Require cycle',
]);

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
