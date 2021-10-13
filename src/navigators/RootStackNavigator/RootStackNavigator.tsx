import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Platform, StatusBar, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import {
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  TransitionPresets
} from '@react-navigation/stack';
import RNBootSplash from 'react-native-bootsplash';
import HomeTabNavigator from '../HomeTabNavigator';
import DetailScreen from '~/screens/DetailScreen/DetailScreenNew';
import { useStore } from '~/store';
import AuthStackNavigator from '../AuthStackNavigator';
import LoadingIndicator from '~/components/elements/LoadingIndicator';
import { lightTheme, darkTheme } from '~/styles/theme';


// Types
export type RootStackParamList = {
  Home: undefined;
  RestaurantDetails: undefined
};

export type HomeTabParamList = {
  Settings: undefined;
  Restaurants: undefined;
  Messages: undefined;
  Events: undefined
};

export type AuthStackParamList = {
  Login: undefined;
};

const RootStack = createStackNavigator<RootStackParamList>();

interface RootStackNavigatorProps { }

const RootStackNavigator: React.FC<RootStackNavigatorProps> = observer(() => {
  const store = useStore();
  const { theme } = store.common;
  const navigatorRef = useRef<NavigationContainerRef<any> | null>(null);
  const [initialized, setInitialized] = useState(false);
  const navigate = useCallback((name: string, params?: any) => {
    navigatorRef.current?.navigate(name, params);
  }, []);
  const rootContainerBackgroundColor =
    theme === 'light'
      ? lightTheme.colors.background
      : darkTheme.colors.background;
  const screenOptions =
    Platform.OS === 'ios'
      ? {
        ...TransitionPresets.ModalSlideFromBottomIOS,
      }
      : {
        ...TransitionPresets.FadeFromBottomAndroid,
      };
  // useEffect(() => {
  //   RNBootSplash.show();
  //   store.auth.signInWithSavedToken().then(() => {
  //     setInitialized(true);
  //     RNBootSplash.hide({duration: 500});
  //   });
  // }, [store.auth]);

  // if (!initialized) {
  //   return null;
  // }

  return (
    <>
      <NavigationContainer ref={navigatorRef} theme={theme === 'light' ? lightTheme : darkTheme}>
        <View style={{ flex: 1, backgroundColor: rootContainerBackgroundColor }}>
          <StatusBar
            backgroundColor={
              theme === 'light'
                ? lightTheme.colors.background
                : darkTheme.colors.background
            }
            barStyle={theme === 'light' ? 'dark-content' : 'light-content'}
          />
          {store.auth.isSignedIn ? (
            <RootStack.Navigator screenOptions={screenOptions}>
              <RootStack.Screen
                name="Home"
                component={HomeTabNavigator}
                options={{
                  headerShown: false,
                }}
              />
              <RootStack.Screen
                name="RestaurantDetails"
                component={DetailScreen}
                options={{
                  headerShown: false,
                }}
              />
            </RootStack.Navigator>)
            : (
              <AuthStackNavigator />
            )}
        </View>
      </NavigationContainer>
      {store.common.isLoading && <LoadingIndicator />}
    </>
  );
});

export default RootStackNavigator;
