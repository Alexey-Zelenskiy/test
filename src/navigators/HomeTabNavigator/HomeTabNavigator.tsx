import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { observer } from 'mobx-react-lite';

// Navigators
import { HomeTabParamList } from '../RootStackNavigator/RootStackNavigator';
import SettingsScreen from '~/screens/SettingsScreen/SettingsScreen';
import SearchStackScreen from '~/screens/SearchScreen/SearchScreen';

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
    // tabBar={(props) => (
    //   <CustomBottomTabBar {...props} badgeCounts={badgeCounts} />
    // )}
    >
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          title: 'Settings',
        }}
      />
      <Tab.Screen
        name="Restaurants"
        component={SearchStackScreen}
        options={{
          title: 'Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
});

export default HomeTabNavigator;
