import React from 'react';
import { Button } from 'react-native-paper';

// Styles
import theme from '~/styles/theme';
import { styles } from './PrimaryButton.styled';

const PrimaryButton: React.FC<React.ComponentProps<typeof Button>> = (
  props,
) => {
  return (
    <Button
      mode="contained"
      style={styles.style}
      contentStyle={styles.contentStyle}
      labelStyle={styles.labelStyle}
      compact={false}
      theme={{
        colors: {
          primary: theme.colors.brandLink,
        },
      }}
      {...props}
    />
  );
};

export default PrimaryButton;
