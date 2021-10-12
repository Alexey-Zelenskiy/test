import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Button,
  ActivityIndicator,
  StatusBar,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import LinkedInAuthModal, { LinkedInToken } from "~/components/LinkedinAuthModal/LinkedinAuthModalModal";
import PrimaryButton from "~/components/PrimaryButton";

import S from './SettingsScreen.styled'


const SettingsScreen = () => {
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
      <LinkedInAuthModal
        ref={modal}
        redirectUri="https://www.google.com/"
        onSuccess={getUser}
      />
      <PrimaryButton onPress={() => modal.current.open()}>Login with Linkedin</PrimaryButton>
      <S.GoogleButton onPress={() => modal.current.open()}><Text>Login with Linkedin</Text><Ionicons name='logo-google' size={30} /></S.GoogleButton>
      <PrimaryButton onPress={() => modal.current.open()}>Login with Linkedin</PrimaryButton>
      {/* {refreshing && <ActivityIndicator size="large" />}

      {localizedFirstName && (
        <>
          <View style={styles.userContainer}>
            {renderItem("Last name", localizedFirstName)}
          </View>
          <Button title="Log Out" onPress={signOut} />
        </>
      )} */}
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
