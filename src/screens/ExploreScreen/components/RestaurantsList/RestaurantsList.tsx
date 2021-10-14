import * as React from 'react';
import Container from '~/components/elements/Container';
import List from '~/components/elements/List';
import RestaurantsListItem from '../RestaurantsListItem';
import styles from './styles';

export interface IData {
  rating: number;
  price: string;
  phone: string;
  id: string;
  review_count: number;
  name: string;
  url: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  image_url: string;
  location?: {
    city?: string;
    country?: string;
    address2?: string;
    address3?: string;
    state?: string;
    address1?: string;
    zip_code?: string;
  }
}

interface Props {
  data: IData[]
};

const RestaurantsList: React.FC<Props> = ({ data }) => {
  return (
    <Container style={styles.root}>
      <List
        data={data}
        renderItem={({ item }) => {
          return <RestaurantsListItem key={item.id} item={item} />;
        }}
      />
    </Container>
  );
};

export default RestaurantsList;
