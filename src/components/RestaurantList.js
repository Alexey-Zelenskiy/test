import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RestaurantsDetail from './RestaurantsDetail';

const RestaurantList = ({ title, restaurants }) => {
  const navigation = useNavigation();

  if (!restaurants.length) {
    return null;
  }

  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleStyle}>{title}</Text>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={restaurants}
        keyExtractor={(restaurant) => restaurant.id}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Detail', { id: item.id })}
            >
              <RestaurantsDetail restaurant={item} />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default RestaurantList;

const styles = StyleSheet.create({
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    marginBottom: 5,
  },
  containerStyle: {
    marginBottom: 10,
  },
});
