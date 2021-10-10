import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import LinkedInModal from '../components/LinkedinModal';

const CLIENT_ID = '78h43jf4e2omfl';
const CLIENT_SECRET = 'F75t096hOWyBDMnc';

function SettingsScreen({ navigation }) {
  // linkedIn sign in code

  StatusBar.setHidden(true);
  const modal = React.createRef();
  const [accessToken, setAccessToken] = useState(undefined);
  const [expiresIn, setExpires_in] = useState(undefined);
  const [refreshing, setRefreshing] = useState(false);
  const [localizedFirstName, setLocalizedFirstName] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const getUser = async (data) => {
    const { access_token, authentication_code } = data;
    if (!authentication_code) {
      setRefreshing(true);

      const response = await fetch('https://api.linkedin.com/v2/me', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + access_token,
        },
      });
      const payload = await response.json();
      setLocalizedFirstName(payload.localizedFirstName);
      console.log(payload.access_token, 's');
      setRefreshing(false);
    } else {
      alert(`authentication_code = ${authentication_code}`);
    }
  };

  const renderItem = (label, value) => {
    return value ? (
      <View style={styles.item}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text>👉</Text>
        <View style={styles.valueContainer}>
          <Text style={styles.value}>{value}</Text>
        </View>
      </View>
    ) : null;
  };

  const signOut = () => {
    setRefreshing(true);
    modal.current.logoutAsync().then(() => {
      setRefreshing(false);
      setLocalizedFirstName(undefined);
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 150,
        paddingBottom: 150,
        backgroundColor: '#fff',
      }}>
      <LinkedInModal
        ref={modal}
        clientID={CLIENT_ID}
        clientSecret={CLIENT_SECRET}
        redirectUri="https://www.google.com/"
        onSuccess={getUser}
      />
      <Button
        title="Login with LinkedIn test"
        onPress={() => modal.current.open()}
      />

      {refreshing && <ActivityIndicator size="small" />}

      {localizedFirstName && (
        <>
          <View style={styles.userContainer}>
            {renderItem('Last name', localizedFirstName)}
          </View>
          <Button title="Log Out" onPress={signOut} />
        </>
      )}
    </View>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
    </SettingsStack.Navigator>
  );
}

export default SettingsStackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userContainer: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: 'cover',
    marginBottom: 15,
  },
  item: {
    width: '100%',
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
  },
  value: {
    fontWeight: 'bold',
    marginLeft: 10,
  },
  linkedInContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainer: {
    alignItems: 'flex-end',
  },
  valueContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
