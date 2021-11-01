import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useTheme } from '@react-navigation/native';
import Container from '~/components/elements/Container';
import Touchable from '~/components/elements/Touchable';
import styles from './styles';
import RestaurantsCardInfo from './components/RestaurantsCardInfo';
import { IData } from '../RestaurantsList/RestaurantsList';
import { ExploreScreenNavigationProp } from '~/navigators/RootStackNavigator/RootStackNavigator';




interface Props {
  item: IData;
  favoritedRestaurant: (id: string) => void;
};

const RestaurantsListItem: React.FC<Props> = ({ item, favoritedRestaurant }) => {

  const { image_url, name, id, isFavorited } = item;
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const onItemPressed = () => {
    navigation.navigate("RestaurantDetails", { id: id });
  };

  const onFavoritedRestaurant = (id: string) => {
    favoritedRestaurant(id);
  }

  return (
    <Touchable onPress={onItemPressed}>
      <Container style={styles.container}>
        <Image style={styles.image} source={{ uri: image_url }} />
        <View style={styles.placeInfoContainer}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeTitle}>{name}</Text>
          </View>
          <RestaurantsCardInfo item={item} />
        </View>
        {isFavorited ?
          (<Ionicons name="heart" size={30} color={'red'} onPress={() => onFavoritedRestaurant(item.id)} />) :
          (<Ionicons name="heart-outline" size={30} color={'red'} onPress={() => onFavoritedRestaurant(item.id)} />)}
      </Container>
    </Touchable>
  );
};

export default RestaurantsListItem;
