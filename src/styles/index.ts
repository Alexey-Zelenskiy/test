//@ts-ignore
import styled from 'styled-components/native';
import SafeAreaViewLib from 'react-native-safe-area-view';
import {Text, Headline} from 'react-native-paper';

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
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
`;

const Logo = styled(Text)`
  font-size: 150px;
  color: ${theme.colors.brandRed};
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
