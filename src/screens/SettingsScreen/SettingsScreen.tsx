import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";

import LinkedInModal, { LinkedInToken } from "../../components/LinkedinModal";

const SettingsScreen = () => {
  StatusBar.setHidden(true);
  const modal = React.createRef<any>();
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [expiresIn, setExpires_in] = useState<number | undefined>(undefined);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [localizedFirstName, setLocalizedFirstName] = useState<
    string | undefined
  >(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);

  const getUser = async (data: LinkedInToken) => {
    const { access_token, authentication_code } = data;
    if (!authentication_code) {
      setRefreshing(true);

      const response = await fetch("https://api.linkedin.com/v2/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });
      const payload = await response.json();
      setLocalizedFirstName(payload.localizedFirstName);
      console.log(payload.access_token, "s");
      setRefreshing(false);
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };

  const renderItem = (label: string, value: string) => {
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
    <View style={styles.container}>
      <View style={styles.linkedInContainer}>
        <LinkedInModal
          ref={modal}
          redirectUri="https://www.google.com/"
          onSuccess={getUser}
        />
        <Button title="Login" onPress={() => modal.current.open()} />
      </View>

      {refreshing && <ActivityIndicator size="large" />}

      {localizedFirstName && (
        <>
          <View style={styles.userContainer}>
            {renderItem("Last name", localizedFirstName)}
          </View>
          <Button title="Log Out" onPress={signOut} />
        </>
      )}
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  userContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    width: 200,
    height: 200,
    borderRadius: 100,
    resizeMode: "cover",
    marginBottom: 15,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginRight: 10,
  },
  value: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  linkedInContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  labelContainer: {
    alignItems: "flex-end",
  },
  valueContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
});
