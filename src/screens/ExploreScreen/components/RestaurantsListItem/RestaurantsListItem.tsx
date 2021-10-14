import * as React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '~/components/elements/Container';
import Touchable from '~/components/elements/Touchable';
import styles from './styles';
import RestaurantsCardInfo from './components/RestaurantsCardInfo';
import { IData } from '../RestaurantsList/RestaurantsList';



interface Props {
  item: IData;
};

const RestaurantsListItem: React.FC<Props> = ({ item }) => {
  const { image_url, name } = item;
  const navigation = useNavigation();

  const _onPlaceItemPressed = () => {
    // navigation.navigate('PlaceDetailsScreen');
  };

  return (
    <Touchable onPress={_onPlaceItemPressed}>
      <Container style={styles.container}>
        <Image style={styles.image} source={image_url as ImageSourcePropType} />
        <View style={styles.placeInfoContainer}>
          <View style={styles.placeInfo}>
            <Text style={styles.placeTitle}>{name}</Text>
          </View>
          <RestaurantsCardInfo item={item} />
        </View>
      </Container>
    </Touchable>
  );
};

export default RestaurantsListItem;
