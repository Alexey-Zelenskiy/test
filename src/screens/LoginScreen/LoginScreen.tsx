
import React, { useState } from "react";
import {
  View,
  Alert,
} from "react-native";
import { observer } from "mobx-react-lite";
import LinkedInAuthModal, { LinkedInToken } from "~/components/LinkedinAuthModal/LinkedinAuthModalModal";
import GS from '~/styles';
import { useStore } from "~/store";
import useThemeColors from "~/hooks/useThemeColors";
import styles from "./styles";
import Container from "~/components/elements/Container";
import Text from "~/components/elements/Text";
import Button from "~/components/elements/Button";
const CLIENT_ID = "78h43jf4e2omfl";
const CLIENT_SECRET = "F75t096hOWyBDMnc";
const SettingsScreen = observer(() => {
  const store = useStore()
  const { primary } = useThemeColors();
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
      <View
        style={[
          styles.container,
          {
            backgroundColor: primary,
          },
        ]}>
        <View style={styles.appIconContainer}>
          <Text isBold isHeadingTitle style={styles.appIconText}>
            LT
          </Text>
        </View>
        <Container style={styles.loginMethodContainer}>
          <View style={styles.loginMethod}>
            <Button
              style={styles.button}
              backgroundColor="#0e76a8"
              isFullWidth
              onPress={() => modal.current.open()}>
              <Text isBold isWhite>
                Connect with Linkedin
              </Text>
            </Button>
            <Button
              style={styles.button}
              backgroundColor="#4267b2"
              isFullWidth
              onPress={() => { store.auth.setUser('s') }}>
              <Text isBold isWhite>
                Connect with Facebook
              </Text>
            </Button>
            <Button
              style={styles.button}
              backgroundColor="#4285F3"
              isFullWidth
              onPress={() => { store.auth.setUser('s') }}>
              <Text isBold isWhite>
                Connect with Google
              </Text>
            </Button>
          </View>
        </Container>
      </View>
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

