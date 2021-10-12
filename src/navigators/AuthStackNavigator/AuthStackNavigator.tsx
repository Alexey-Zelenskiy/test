import React from 'react';
import { observer } from 'mobx-react-lite';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStackParamList } from '../RootStackNavigator/RootStackNavigator';
import LoginScreen from '~/screens/LoginScreen';


const AuthStack = createStackNavigator<AuthStackParamList>();

interface AuthStackNavigatorProps { }

const AuthStackNavigator: React.FC<AuthStackNavigatorProps> = observer(() => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
});

export default AuthStackNavigator;
