//@ts-ignore
import styled from 'styled-components/native';
import {Button} from 'react-native-paper';
import theme from '~/styles/theme';

const GoogleButton = styled(Button)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${theme.colors.brandWhite};
`;

export default {
  GoogleButton,
};
