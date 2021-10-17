import * as React from 'react';
import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Container from '~/components/elements/Container';
import Touchable from '~/components/elements/Touchable';
import styles from './styles';
import RestaurantsCardInfo from './components/RestaurantsCardInfo';
import { IData } from '../RestaurantsList/RestaurantsList';
import { ExploreScreenNavigationProp } from '~/navigators/RootStackNavigator/RootStackNavigator';



interface Props {
  item: IData;
};

const RestaurantsListItem: React.FC<Props> = ({ item }) => {
  const { image_url, name, id } = item;
  const navigation = useNavigation<ExploreScreenNavigationProp>();

  const onItemPressed = () => {
    navigation.navigate("RestaurantDetails", { id: id });
  };

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
      </Container>
    </Touchable>
  );
};

export default RestaurantsListItem;
