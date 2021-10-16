import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import * as Location from 'expo-location';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HomeTabParamList } from '../RootStackNavigator/RootStackNavigator';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import ExploreScreen from '~/screens/ExploreScreen/ExploreScreen';
import CustomBottomTabBar from '~/components/CustomBottomTabBar';

import styles from './styles'

import { useStore } from '~/store';

const Tab = createBottomTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps { }

const HomeTabNavigator: React.FC<HomeTabNavigatorProps> = observer(() => {

  const store = useStore()

  const { auth: { userLocation } } = store

  useEffect(() => {
    store.common.setLoading(true)
    if (store.auth.userLocation)
      store.restaurants.fetchRestaurants(store.auth.userLocation).then(() => {
        store.common.setLoading(false)
      })
  }, [store, store.auth.isSignedIn, store.auth.userLocation]);

  const renderExploreHeaderTitle = () => {
    return (
      <View style={styles.headerLeftContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={18}
          style={styles.locationIcon}
          isPrimary
        />
        <Text style={styles.headerTitle}>{userLocation?.location}</Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomBottomTabBar {...props} />
      )}
    >
      {/* <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: (props) => <Ionicons name='md-settings' {...props} />,
        }}
      /> */}
      <Tab.Screen
        name="Restaurants"
        component={ExploreScreen}
        options={{
          headerTitle: renderExploreHeaderTitle,
          headerTitleAlign: 'left',
          headerRightContainerStyle: styles.headerRightContainer,
          title: 'Restaurants',

          tabBarIcon: (props) => <Ionicons name="md-restaurant"  {...props} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={ExploreScreen}
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: (props) => <MaterialIcons name='message' {...props} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={ExploreScreen}
        options={{
          title: 'Events',
          headerShown: false,
          tabBarIcon: (props) => <MaterialCommunityIcons name='calendar-clock' {...props} />,
        }}
      />
    </Tab.Navigator>
  );
});

export default HomeTabNavigator;
