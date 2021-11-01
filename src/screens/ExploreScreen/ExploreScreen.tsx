import React, { useCallback, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, InteractionManager } from 'react-native';
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
import { ExploreScreenProps } from '~/navigators/RootStackNavigator/RootStackNavigator';
import Text from '~/components/elements/Text';
import Section from '~/components/elements/Section';


const ExploreScreen: React.FC<ExploreScreenProps> = observer(({ navigation }) => {

  const store = useStore()

  const [
    isNavigationTransitionFinished,
    setIsNavigationTransitionFinished,
  ] = useState<boolean>(false);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        setIsNavigationTransitionFinished(true);
      });
      return () => task.cancel();
    }, []),
  );

  const [term, setTerm] = useState('');
  const [searchApi, restaurants, errMessage] = useRestaurants();

  useEffect(() => {
    store.restaurants.setLoading(true)
    if (store.auth.userLocation)
      store.restaurants.fetchRestaurants(store.auth.userLocation)
  }, [store, store.auth.isSignedIn, store.auth.userLocation]);


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
        {store.restaurants.favoritedList.length > 0 && <>
          <Section
            title="Favorited"
            divider
          >
            <RestaurantsList data={store.restaurants.favoritedList as IData[]} favoritedRestaurant={store.restaurants.favoritedRestaurant} />
          </Section>
        </>}
        <RestaurantsList data={store.restaurants.restaurantsList as IData[]} favoritedRestaurant={store.restaurants.favoritedRestaurant} />
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
