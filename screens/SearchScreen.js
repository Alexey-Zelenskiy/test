import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchBar from '../components/SearchBar';
import RestaurantList from '../components/RestaurantList';
import useRestaurants from '../hooks/useRestaurants';
import RestaurantsDetail from '../components/RestaurantsDetail';
import DetailScreen from './DetailScreenNew'

import { FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function SearchScreen({ navigation }) {
  const [term, setTerm] = useState('');
  const [searchApi, restaurants, errMessage] = useRestaurants();

  return (
    <>
      <ScrollView>
        <FlatList
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
      </ScrollView>
    </>
  );
}

//, { id: item.id }

//{errMessage ? <Text>{errMessage}</Text> : null}

const SearchStack = createNativeStackNavigator();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator screenOptions={{ headerShown: true }}>
      <SearchStack.Screen name="Restaurants" component={SearchScreen} />
      <SearchStack.Screen name="Detail" component={DetailScreen} />
    </SearchStack.Navigator>
  );
}

const styles = StyleSheet.create({
  textStyle: {
    marginLeft: 12,
  },
});

export default SearchStackScreen;
