import * as React from 'react';
import { View } from 'react-native';
import { useTheme } from '@react-navigation/native';

import styles from './styles';
import Button from '~/components/elements/Button';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Text from '~/components/elements/Text';
import Rating from '~/components/elements/Rating';
import { IData } from '../../../RestaurantsList/RestaurantsList';

interface Props {
  item: IData;
  ratingStarBackgroundColor?: string;
};

const RestaurantsCardInfo: React.FC<Props> = ({
  item,
  ratingStarBackgroundColor,
}) => {
  const { review_count, rating, price, phone, location } = item;
  const {
    colors: { border, primary },
  } = useTheme();
  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Rating
          value={rating}
          itemSize={16}
          readonly
          ratingStarBackgroundColor={ratingStarBackgroundColor}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          style={[styles.button, { backgroundColor: border }]}
          icon={<MaterialCommunityIcons color={primary} name='map-marker' size={10} />}>
          <Text isPrimary style={styles.buttonText}>{`${location?.city}`}</Text>
          <Text isPrimary style={styles.buttonText}>{`${location?.address1}`}</Text>
        </Button>
        <Text isPrimary style={styles.buttonText}>{`${review_count} reviews`}</Text>
        <Text isPrimary style={styles.buttonText}>{`${price}`}</Text>
        <Text isPrimary style={styles.buttonText}>{`${phone}`}</Text>
      </View>
    </View>
  );
};

export default RestaurantsCardInfo;
