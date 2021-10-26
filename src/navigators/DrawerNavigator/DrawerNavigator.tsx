import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/store';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import HomeTabNavigator from '../HomeTabNavigator';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { SafeAreaView, View } from 'react-native';

const Drawer = createDrawerNavigator();

interface DrawerNavigatorProps { }

const DrawerNavigator: React.FC<DrawerNavigatorProps> = observer(() => {

  const store = useStore()

  const CustomDrawerContent = (props: DrawerContentComponentProps) => {
    const filteredProps = {
      ...props,
      state: {
        ...props.state,
        routeNames: props.state.routeNames.filter(routeName => {
          routeName !== 'Home';
        }),
        routes: props.state.routes.filter(route => route.name !== 'Home'),
      },
    };
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{

            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MaterialIcons name="supervised-user-circle" size={100} />
        </View>
        <DrawerContentScrollView {...filteredProps}>
          <DrawerItemList {...filteredProps} />
        </DrawerContentScrollView>
      </SafeAreaView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerPosition: 'right' }}>
      <Drawer.Screen name="Home" component={HomeTabNavigator} />
      <Drawer.Screen name="My Profile" component={() => {
        return <></>
      }} />
      <Drawer.Screen name="Preferences" component={() => {
        return <></>
      }} />
      <Drawer.Screen name="Tutorial" component={() => {
        return <></>
      }} />
      <Drawer.Screen name="Support" component={() => {
        return <></>
      }} />
      <Drawer.Screen name="Legal" component={() => {
        return <></>
      }} />
    </Drawer.Navigator>
  );
});

export default DrawerNavigator;


