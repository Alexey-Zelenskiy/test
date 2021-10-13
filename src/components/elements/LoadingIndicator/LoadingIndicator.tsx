import * as React from 'react';
import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, View } from 'react-native';
import useThemeColors from '~/hooks/useThemeColors';
import styles from './styles'

type LoadingIndicatorProps = {
} & ActivityIndicatorProps;

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  ...rest
}) => {
  const { primary } = useThemeColors();
  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <ActivityIndicator color={primary}
        {...rest} animating size="large" />
    </View>
  );
};
export default LoadingIndicator;
