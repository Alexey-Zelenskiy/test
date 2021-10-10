import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Text,
  View,
} from "react-native";
import { WebView } from "react-native-webview";

import { pipe, evolve, propSatisfies, applySpec, propOr, add } from "ramda";
import querystring from "query-string";

const AUTHORIZATION_URL = "https://www.linkedin.com/oauth/v2/authorization";
const ACCESS_TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken";
const LOGOUT_URL = "https://www.linkedin.com/m/logout";

export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export const cleanUrlString = (state) => state.replace("#!", "");

export const getCodeAndStateFromUrl = pipe(
  querystring.extract,
  querystring.parse,
  evolve({ state: cleanUrlString })
);

export const getErrorFromUrl = pipe(
  querystring.extract,
  querystring.parse,
  evolve({ error_description: cleanUrlString })
);

export const transformError = applySpec({
  type: propOr("", "error"),
  message: propOr("", "error_description"),
});

export const isErrorUrl = pipe(
  querystring.extract,
  querystring.parse,
  propSatisfies((error) => typeof error !== "undefined", "error")
);

export const injectedJavaScript = `
  setTimeout(function() {
    document.querySelector("input[type=text]").setAttribute("autocapitalize", "off");
  }, 1);
  true;
`;

export const getAuthorizationUrl = ({
  authState,
  clientID,
  permissions,
  redirectUri,
}) =>
  `${AUTHORIZATION_URL}?${querystring.stringify({
    response_type: "code",
    client_id: clientID,
    scope: permissions?.join(" ").trim(),
    state: authState,
    redirect_uri: redirectUri,
  })}`;

export const getPayloadForToken = ({
  clientID,
  clientSecret,
  code,
  redirectUri,
}) =>
  querystring.stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
    client_id: clientID,
    client_secret: clientSecret,
  });

export const fetchToken = async (payload) => {
  const response = await fetch(ACCESS_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: payload,
  });
  return await response.json();
};

export const logError = (error) =>
  console.log(JSON.stringify(error, null, 2), "sssss");

export const onLoadStart = async (
  url,
  authState,
  onSuccess,
  onError,
  close,
  getAccessToken,
  shouldGetAccessToken
) => {
  if (isErrorUrl(url)) {
    const err = getErrorFromUrl(url);
    close();
    onError && onError(transformError(err));
  } else {
    const { code, state } = getCodeAndStateFromUrl(url);
    if (!shouldGetAccessToken) {
      onSuccess({ authentication_code: code });
    } else if (state !== authState) {
      onError &&
        onError({
          type: "state_not_match",
          message: `state is not the same ${state}`,
        });
    } else {
      const token = await getAccessToken(code);
      console.log(token);
      onSuccess(token);
    }
  }
};

const LinkedInModal = forwardRef(
  (
    {
      authState,
      redirectUri,
      onError = logError,
      shouldGetAccessToken = true,
      onSignIn,
      onSuccess,
      clientID,
      permissions = ["r_liteprofile", "r_emailaddress"],
      clientSecret,
      onClose,
      onOpen,
      renderButton,
      linkText = "Login with LinkedIn",
      areaTouchText = { top: 10, bottom: 10, left: 10, right: 10 },
      isDisabled = false,
      renderClose,
      animationType = "fade",
      containerStyle = StyleSheet.create({}),
      wrapperStyle = StyleSheet.create({}),
      closeStyle = StyleSheet.create({}),
    },
    ref
  ) => {
    const [raceCondition, setRaceCondition] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [auth, setAuth] = useState(uid());
    const [logout, setLogout] = useState(false);

    useEffect(() => {
      if (modalVisible) {
        const _authState = authState || uid();
        setRaceCondition(false);
        setAuth(_authState);
      }
    }, [modalVisible, authState]);

    const onNavigationStateChange = async ({ url }) => {
      if (url.includes(redirectUri) && !raceCondition) {
        setModalVisible(false);
        setRaceCondition(true);

        if (onSignIn) {
          onSignIn();
        }
        await onLoadStart(
          url,
          auth,
          onSuccess,
          onError,
          close,
          getAccessToken,
          shouldGetAccessToken
        );
      }
    };
    const _getAuthorizationUrl = () =>
      getAuthorizationUrl({
        clientID: clientID,
        permissions: permissions,
        redirectUri: redirectUri,
        authState: auth,
      });

    const getAccessToken = async (code) => {
      const payload = getPayloadForToken({
        clientID,
        clientSecret,
        code: code,
        redirectUri,
      });
      const token = await fetchToken(payload);
      if (token.error) {
        onError(transformError(token));
        return {};
      }
      return token;
    };

    const close = () => {
      if (onClose) {
        onClose();
      }
      setModalVisible(false);
    };

    const open = () => {
      if (onOpen) {
        onOpen();
      }
      setModalVisible(true);
    };

    const logoutAsync = () =>
      new Promise((resolve) => {
        setLogout(true);
        setTimeout(() => {
          setLogout(false);
          resolve();
        }, 3000);
      });

    const _renderButton = () => {
      if (renderButton) {
        return (
          <TouchableOpacity
            onPress={open}
            style={{ flex: 1 }}
            hitSlop={areaTouchText}
            disabled={isDisabled}>
            {renderButton()}
          </TouchableOpacity>
        );
      }
      return (
        <TouchableOpacity
          onPress={open}
          style={{ flex: 1 }}
          hitSlop={areaTouchText}
          disabled={isDisabled}>
          <Text>{linkText}</Text>
        </TouchableOpacity>
      );
    };

    const _renderClose = () => {
      if (renderClose) {
        return renderClose();
      }
      return (
        <Image
          source={require("../assets/splash.png")}
          resizeMode="contain"
          style={{
            ...evolve({ width: add(-8), height: add(-8) }, closeSize),
          }}
        />
      );
    };

    const renderWebview = () => {
      if (!modalVisible) {
        return null;
      }

      return (
        <WebView
          source={{ uri: _getAuthorizationUrl() }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState
          javaScriptEnabled
          domStorageEnabled
          injectedJavaScript={injectedJavaScript}
          sharedCookiesEnabled
          incognito={true}
        />
      );
    };

    useImperativeHandle(
      ref,
      () => ({
        logoutAsync: () => {
          logoutAsync();
        },
        open: () => {
          open();
        },
      }),
      [logoutAsync, open]
    );

    return (
      <View style={styles.container}>
        {_renderButton()}
        <Modal
          animationType={animationType}
          transparent
          visible={modalVisible}
          onRequestClose={close}>
          <View style={[styles.container, containerStyle]}>
            <View style={[styles.wrapper, wrapperStyle]}>
              {renderWebview()}
            </View>
            <TouchableOpacity
              onPress={close}
              style={[styles.close, closeStyle]}
              //   accessibilityComponentType={'button'}
              //   accessibilityTraits={['button']}
            >
              {_renderClose()}
            </TouchableOpacity>
          </View>
        </Modal>
        {logout && (
          <View style={{ width: 1, height: 1 }}>
            <WebView
              source={{ uri: LOGOUT_URL }}
              javaScriptEnabled
              domStorageEnabled
              sharedCookiesEnabled
              onLoadEnd={() => setLogout(false)}
            />
          </View>
        )}
      </View>
    );
  }
);

export default LinkedInModal;

const closeSize = { width: 14, height: 14 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  wrapper: {
    flex: 1,
    borderRadius: 5,
    borderWidth: 10,
    borderColor: "rgba(0, 0, 0, 0.6)",
  },
  close: {
    position: "absolute",
    top: 35,
    right: 5,
    backgroundColor: "#000",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    ...closeSize,
  },
});
