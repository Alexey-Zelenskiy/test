import * as React from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  StyleProp,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './styles';
import { Ionicons } from '@expo/vector-icons';

interface OwnProps {
  leftIcon?: any;
  leftIconSize?: number;
  containerStyle?: StyleProp<ViewStyle>;
  hasMargin?: boolean;
}

type TextFieldProps = OwnProps & TextInputProps;

const TextField: React.FC<TextFieldProps> = ({
  leftIcon,
  leftIconSize,
  style,
  containerStyle,
  hasMargin,
  ...rest
}) => {
  const {
    colors: { text, background },
  } = useTheme();
  let margin = 0;
  if (hasMargin) {
    margin = 5;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, marginTop: margin, marginBottom: margin },
        containerStyle,
      ]}>
      {leftIcon && (
        <Ionicons style={styles.leftIcon} name={leftIcon} size={leftIconSize} />
      )}
      <TextInput
        style={[{ color: text }, styles.textField, style]}
        placeholderTextColor={text}
        underlineColorAndroid="transparent"
        {...rest}
      />
    </View>
  );
};

TextField.defaultProps = {
  leftIconSize: 14,
};

export default TextField;
