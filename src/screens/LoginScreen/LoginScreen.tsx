
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LinkedInAuthModal, { LinkedInToken } from "~/components/LinkedinAuthModal/LinkedinAuthModalModal";
import S from './LoginScreen.styled'
import GS from '~/styles';
import theme from "~/styles/theme";
import { useStore } from "~/store";
import { observer } from "mobx-react-lite";
const CLIENT_ID = "78h43jf4e2omfl";
const CLIENT_SECRET = "F75t096hOWyBDMnc";
const SettingsScreen = observer(() => {
  const store = useStore()
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
      store.common.setLoading(true)
      const response = await fetch("https://api.linkedin.com/v2/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + access_token,
        },
      });
      const payload = await response.json();
      setLocalizedFirstName(payload.localizedFirstName);
      store.auth.setUser(payload)
      store.common.setLoading(false)
    } else {
      Alert.alert(`authentication_code = ${authentication_code}`);
    }
  };

  return (
    <GS.SafeAreaView>
      <GS.ScreenContent>
        <GS.LogoContainer>
          <GS.Logo>LT</GS.Logo>
        </GS.LogoContainer>
        <S.Container>
          <S.LinkedinButton style={theme.shadow} onPress={() => modal.current.open()}>
            <S.ButtonText>Login with Linkedin</S.ButtonText>
            <MaterialCommunityIcons name='linkedin' size={50} />
          </S.LinkedinButton>
        </S.Container>
      </GS.ScreenContent>
      <LinkedInAuthModal
        ref={modal}
        redirectUri="https://www.google.com/"
        onSuccess={getUser}
        clientID={CLIENT_ID}
        clientSecret={CLIENT_SECRET}
      />
    </GS.SafeAreaView>

  );
});

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
