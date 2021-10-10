/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootNavigation from './navigators';
import { RootStore, StoreProvider } from './store';

const App: React.FC = () => {
  return (
    <SafeAreaProvider>
      <StoreProvider value={new RootStore()}>
        <PaperProvider>
          <RootNavigation />
        </PaperProvider>
      </StoreProvider>
    </SafeAreaProvider>
  );
};

export default App;
