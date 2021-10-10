import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  const searchForRestaurants = () => {};
  return (
    <View style={styles.backgroundStyle}>
      <FontAwesome style={styles.iconStyle} name='search' />
      <TextInput
        style={styles.inputStyle}
        placeholder='Search'
        autoCapitalize='none'
        value={term}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    margin: 12,
    flexDirection: 'row',
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    alignSelf: 'center',
    fontSize: 30,
    color: 'black',
    marginHorizontal: 10,
  },
});
