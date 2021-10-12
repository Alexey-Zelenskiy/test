import React from 'react';
import {StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

// Styles
import S from './Loader.styled';

interface LoaderProps {}

const Loader: React.FC<LoaderProps> = () => {
  return (
    <S.Container style={StyleSheet.absoluteFill}>
      <ActivityIndicator animating size="large" />
    </S.Container>
  );
};

export default Loader;
