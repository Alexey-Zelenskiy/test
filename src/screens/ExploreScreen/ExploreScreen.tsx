import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, InteractionManager } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RestaurantList from '../../components/RestaurantList';
import useRestaurants from '../../hooks/useRestaurants';
import RestaurantsDetail from '../../components/RestaurantsDetail';
import DetailScreen from '../DetailScreen/DetailScreenNew';

import { FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import GS from '~/styles';
import SearchBar from '~/components/elements/SearchBar';
import LoadingIndicator from '~/components/elements/LoadingIndicator';
import RestaurantsList from './components/RestaurantsList';
import { IData } from './components/RestaurantsList/RestaurantsList';
import { observer } from 'mobx-react-lite';
import { useStore } from '~/store';

interface Props { }

const ExploreScreen = observer(({ navigation }: any) => {

  const store = useStore()

  const [
    isNavigationTransitionFinished,
    setIsNavigationTransitionFinished,
  ] = useState<boolean>(false);

  // useFocusEffect(
  //   useCallback(() => {
  //     const task = InteractionManager.runAfterInteractions(() => {
  //       setIsNavigationTransitionFinished(true);
  //     });
  //     return () => task.cancel();
  //   }, []),
  // );
  const [term, setTerm] = useState('');
  const [searchApi, restaurants, errMessage] = useRestaurants();

  return (
    <GS.SafeAreaView>
      <ScrollView stickyHeaderIndices={[0]}>
        <SearchBar placeholder="Find restaurants..." />
        {isNavigationTransitionFinished ? (
          <>

          </>
        ) : (
          <LoadingIndicator size="large" />
        )}
        <RestaurantsList data={store.restaurants.restaurantsList as IData[]} />
        {/* <FlatList
          data={restaurants as []}
          keyExtractor={(restaurant) => restaurant.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('Detail', { id: item.id })}>
                <RestaurantsDetail restaurant={item} />
              </TouchableOpacity>
            );
          }}
        /> */}
      </ScrollView>
    </GS.SafeAreaView>
  );
}
)

export default ExploreScreen;
