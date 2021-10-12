//@ts-ignore
import styled from 'styled-components/native';
import {Button, Text} from 'react-native-paper';
import theme from '~/styles/theme';

const LinkedinButton = styled(Button)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${theme.colors.brandWhite};
  height: auto;
`;

const ButtonText = styled(Text)``;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default {
  LinkedinButton,
  Container,
  ButtonText,
};
