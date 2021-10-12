//@ts-ignore
import styled from 'styled-components/native';
import theme from '~/styles/theme';

const Container = styled.View`
  flex-direction: row;
  background-color: ${theme.colors.brandGrayLight};
`;

const TouchableOpacity = styled.TouchableOpacity`
  padding: 10px 5px 5px;
  flex: 1;
  align-items: center;
`;

const IconContainer = styled.View`
  position: relative;
  width: 26px;
  height: 26px;
`;

export default {
  Container,
  TouchableOpacity,
  IconContainer,
};
