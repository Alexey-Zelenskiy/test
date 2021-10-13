import React from 'react';
import { observer } from 'mobx-react-lite';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../RootStackNavigator/RootStackNavigator';
import LoginScreen from '~/screens/LoginScreen';
import useThemeColors from '~/hooks/useThemeColors';


const AuthStack = createStackNavigator<AuthStackParamList>();

interface AuthStackNavigatorProps { }

const AuthStackNavigator: React.FC<AuthStackNavigatorProps> = observer(() => {
  const insets = useSafeAreaInsets();
  const { background } = useThemeColors();
  return (
    <AuthStack.Navigator screenOptions={{
      headerShown: true,
      title: '',
      headerStatusBarHeight: insets.top,
      headerStyle: { backgroundColor: background },
    }}>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
});

export default AuthStackNavigator;
