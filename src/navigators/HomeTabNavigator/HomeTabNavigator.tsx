import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';

// Navigators
import { HomeTabParamList } from '../RootStackNavigator/RootStackNavigator';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import SearchScreen from '~/screens/SearchScreen/SearchScreen';
import CustomBottomTabBar from '~/components/CustomBottomTabBar';
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';


// // Store
// import {useStore} from '~/store';
// // Screens
// import ProfileScreen from '~/screens/profile-screen';
// import DashboardScreen from '~/screens/dashboard-screen';
// // Components
// import Icon from '~/components/icon';
// import CustomBottomTabBar from '~/components/custom-bottom-tab-bar';

const Tab = createBottomTabNavigator<HomeTabParamList>();

interface HomeTabNavigatorProps { }

const HomeTabNavigator: React.FC<HomeTabNavigatorProps> = observer(() => {
  // const store = useStore();
  // const badgeCounts = {
  //   Dashboard: store.chatMonitor.chatCount,
  // };
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
        component={SearchScreen}
        options={{
          title: 'Restaurants',
          headerShown: false,
          tabBarIcon: (props) => <Ionicons name="md-restaurant" {...props} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={SearchScreen}
        options={{
          title: 'Messages',
          headerShown: false,
          tabBarIcon: (props) => <MaterialIcons name='message' {...props} />,
        }}
      />
      <Tab.Screen
        name="Events"
        component={SearchScreen}
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
