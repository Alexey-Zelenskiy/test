import React from 'react';
import { Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Styles
import S from './CustomBottomTabBar.styled';
import theme from '~/styles/theme';

interface CustomBottomTabBarProps extends BottomTabBarProps {
}

const CustomBottomTabBar: React.FC<CustomBottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <S.Container style={{ paddingBottom: bottom }}>
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
          ? theme.colors.brandWhite
          : theme.colors.brandDark;
        return (
          <S.TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            // accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}>
            {options.tabBarIcon && (
              <S.IconContainer>
                <Text>
                  {options.tabBarIcon({ focused: isFocused, color, size: 24 })}
                </Text>
              </S.IconContainer>
            )}
            <Text style={{ color }}>{label}</Text>
          </S.TouchableOpacity>
        );
      })}
    </S.Container>
  );
};

export default CustomBottomTabBar;
