import {DefaultTheme} from 'react-native-paper';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    // Brand colors
    brandWhite: '#fff',
    brandDark: '#2D3640',
    brandGray: '#495057',
    brandGrayLight: '#ccc',
    brandLink: '#007bff',
    lightText: '#fff',
    brandRed: '#FA6772',
    primaryRed: '#F92B6A',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
};
