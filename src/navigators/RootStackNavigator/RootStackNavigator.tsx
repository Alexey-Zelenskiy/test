import React, { useEffect, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';

// Navigators
import HomeTabNavigator from '../HomeTabNavigator';
// // Screens
// import TextChatScreen from '~/screens/text-chat-screen';
// //Components
// import Loader from '~/components/loader';
// import ChatAppBarMenu from '~/components/chat-app-bar-menu';
// import ChatAppBarTitle from '~/components/chat-app-bar-title';
// // Store
// import {useStore} from '~/store';
// import useChatMonitor from '~/store/effects/use-chat-monitor';
// import useChatManager from '~/store/effects/use-chat-manager';
// // Styles
// import theme from '~/styles/theme';

// Types
export type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
};

export type HomeTabParamList = {
  Settings: undefined;
  Restaurants: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

interface RootStackNavigatorProps { }

const RootStackNavigator: React.FC<RootStackNavigatorProps> = observer(() => {
  const [initialized, setInitialized] = useState(false);
  // const store = useStore();
  const navigatorRef = useRef<NavigationContainerRef<any> | null>(null);
  // // TODO: add real types
  // // const navigate = useCallback((name: string, params?: any) => {
  // //   navigatorRef.current?.navigate(name, params);
  // // }, []);

  // useEffect(() => {
  //   RNBootSplash.show();
  //   store.auth.signInWithSavedToken().then(() => {
  //     setInitialized(true);
  //     RNBootSplash.hide({duration: 500});
  //   });
  // }, [store.auth]);

  // useChatMonitor();
  // useChatManager();

  // if (!initialized) {
  //   return null;
  // }

  return (
    <>
      <NavigationContainer ref={navigatorRef}>
        <RootStack.Navigator>
          <RootStack.Screen
            name="Home"
            component={HomeTabNavigator}
            options={{
              headerShown: false,
            }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
      {/* {store.common.isLoading && <Loader />} */}
    </>
  );
});

export default RootStackNavigator;
