import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'

import SearchStackScreen from './screens/SearchScreen';
import SettingsStackScreen from './screens/SettingsScreen';
import DetailScreen from './screens/DetailScreen';

function DetailsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
    </View>
  );
}

function MessagesScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Messages</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

// function SettingsScreen({ navigation }, screenOptions={ headerShown: false }) {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

function RestaurantsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Restaurants screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const MessagesStack = createNativeStackNavigator();

function MessagesStackScreen() {
  return (
    <MessagesStack.Navigator>
      <MessagesStack.Screen name="Messages" component={MessagesScreen} />
      <MessagesStack.Screen name="Details" component={DetailsScreen} />
    </MessagesStack.Navigator>
  );
}

// const RestaurantsStack = createNativeStackNavigator();

// function RestaurantsStackScreen() {
//   return (
//     <RestaurantsStack.Navigator>
//       <RestaurantsStack.Screen name="Restaurants" component={RestaurantsScreen} />
//       <RestaurantsStack.Screen name="Details" component={DetailsScreen} />
//     </RestaurantsStack.Navigator>
//   );
// }



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={
          { headerTitleAlign: 'center' },
          { headerShown: false }
        }
      >
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
        <Tab.Screen name="Restaurants" component={SearchStackScreen} />
        <Tab.Screen name="Messages" component={MessagesStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

//screenOptions={{ headerShown: false }
