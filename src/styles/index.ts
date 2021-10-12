//@ts-ignore
import styled from 'styled-components/native';
import SafeAreaViewLib from 'react-native-safe-area-view';
import {Text} from 'react-native-paper';

import theme from '~/styles/theme';

// Base layouts
export const ScreenContent = styled.ScrollView`
  padding: 10px 35px;
  background-color: ${theme.colors.brandWhite};
  flex: 1;
`;

export const SafeAreaView = styled(SafeAreaViewLib)`
  flex: 1;
  background-color: white;
`;

const LogoContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  margin: 50px 0 20px 0;
`;

const Logo = styled.Image`
  height: 40px;
  resize-mode: contain;
`;

const TermsAndConditions = styled(Text)`
  margin-top: 20px;
`;

export default {
  ScreenContent,
  SafeAreaView,
  LogoContainer,
  Logo,
  TermsAndConditions,
};
