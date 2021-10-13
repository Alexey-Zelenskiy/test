import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Styles
import styles from './styles';
import useThemeColors from '~/hooks/useThemeColors';

interface CustomBottomTabBarProps extends BottomTabBarProps {
}

const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  const { primary, secondary } = useThemeColors();

  return (
    <View style={{ ...styles.container, paddingBottom: bottom }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const color = isFocused
          ? primary
          : secondary;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.button}
            onLongPress={onLongPress}>
            {options.tabBarIcon && (
              <View style={styles.iconContainer}>
                <Text>
                  {options.tabBarIcon({ focused: isFocused, color, size: 24 })}
                </Text>
              </View>
            )}
            <Text style={{ color }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomTabBar;
