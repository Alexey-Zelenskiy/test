import React, { useEffect, useState, useRef, useCallback } from 'react';
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
import HomeTabNavigator from '../HomeTabNavigator';
import DetailScreen from '~/screens/DetailScreen/DetailScreenNew';
import { useStore } from '~/store';
import theme from '~/styles/theme';
import AuthStackNavigator from '../AuthStackNavigator';
import Loader from '~/components/Loader';

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
  const [initialized, setInitialized] = useState(false);
  const store = useStore();
  const navigatorRef = useRef<NavigationContainerRef<any> | null>(null);
  const navigate = useCallback((name: string, params?: any) => {
    navigatorRef.current?.navigate(name, params);
  }, []);

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
      <NavigationContainer ref={navigatorRef}>
        {store.auth.isSignedIn ? (
          <RootStack.Navigator>
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
      </NavigationContainer>
      {store.common.isLoading && <Loader />}
    </>
  );
});

export default RootStackNavigator;
