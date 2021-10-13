/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { AppState, AppStateStatus, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import RootNavigation from './navigators';
import { RootStore, StoreProvider } from './store';



const App: React.FC = () => {
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(
    appState.current,
  );
  const scheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState<string>('light');

  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState: AppStateStatus) => {
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
  };



  return (
    <SafeAreaProvider>
      <StoreProvider value={new RootStore()}>
        <RootNavigation />
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
