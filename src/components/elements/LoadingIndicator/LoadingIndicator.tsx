import * as React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native';
import useThemeColors from '~/hooks/useThemeColors';
import Text from '../Text';
import styles from './styles'

type LoadingIndicatorProps = {
} & ActivityIndicatorProps;

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  ...rest
}) => {
  const { primary } = useThemeColors();
  const [text, setText] = React.useState('');

  React.useEffect(() => {
    setInterval(() => {
      setTimeout(() => {
        setText('.');
      }, 200);
      setTimeout(() => {
        setText('..');
      }, 500);
      setTimeout(() => {
        setText('...');
      }, 800);
    }, 1500);
  }, []);

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <Text isHeadingTitle>Loading{text}</Text>
      {/* <ActivityIndicator color={primary}
        {...rest} animating size="large" /> */}
    </View>
  );
};
export default LoadingIndicator;
