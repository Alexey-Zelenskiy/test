import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';
import Geolocation from 'react-native-geolocation-service';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { HomeTabParamList } from '../RootStackNavigator/RootStackNavigator';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import ExploreScreen from '~/screens/ExploreScreen/ExploreScreen';
import CustomBottomTabBar from '~/components/CustomBottomTabBar';

import styles from './styles'


const Tab = createBottomTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps { }

const HomeTabNavigator: React.FC<HomeTabNavigatorProps> = observer(() => {

  const [currentLocation, setCurrentLocation] = useState<any>({
    longitude: 0,
    latitude: 0,
    longitudeDelta: 0.0022,
    latitudeDelta: 0.0031,
  });

  const _initUserLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        console.log(position)
        const { longitude, latitude } = position.coords;
        setCurrentLocation((location: any) => {
          return {
            ...location,
            longitude,
            latitude,
          };
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { timeout: 15000, maximumAge: 10000 },
    );
  };

  useEffect(() => {
    const requestAndroidLocationPermission = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lunch Timing App Permission',
          message:
            'Lunch Timing App needs access to your location ' +
            'so you see where you are on the map.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        _initUserLocation();
      } else {
        console.log('Location permission denied');
      }
    };

    if (Platform.OS === 'android') {
      requestAndroidLocationPermission();
    } else {
      _initUserLocation();
    }
  }, []);

  const renderExploreHeaderTitle = () => {
    return (
      <View style={styles.headerLeftContainer}>
        <MaterialCommunityIcons
          name="map-marker"
          size={18}
          style={styles.locationIcon}
          isPrimary
        />
        <Text style={styles.headerTitle}>588 Blanda Square - Virginia</Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => (
        <CustomBottomTabBar {...props} />
      )}
    >
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: 'Settings',
          tabBarIcon: (props) => <Ionicons name='md-settings' {...props} />,
        }}
      />
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
