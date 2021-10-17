import * as React from 'react';

import styles from './styles';
import { IData } from '~/screens/ExploreScreen/components/RestaurantsList/RestaurantsList';
import Card from '~/components/elements/Card';
import Container from '~/components/elements/Container';
import Text from '~/components/elements/Text';
import RestaurantsCardInfo from '~/screens/ExploreScreen/components/RestaurantsListItem/components/RestaurantsCardInfo';


type HeadingInformationProps = {
  item: any;
};

const HeadingInformation: React.FC<HeadingInformationProps> = ({ item }) => {
  const { name, phone, display_phone, location } = item;
  return (
    <Card
      isSmallCover
      title={name}
      subTitle={display_phone}
      titleStyle={styles.title}
      style={styles.headingContainer}>
      <RestaurantsCardInfo item={item} />
      <Container style={styles.infoSection}>
        <Text style={styles.label}>Opening Hours</Text>
        <Text>09:30 AM - 10:00PM</Text>
      </Container>
      <Container style={styles.infoSection}>
        {/* <Text style={styles.label}>Coupon Codes</Text> */}
        <Container>
          {/* <Container style={styles.coupon}>
            <Icon name="tag" style={styles.couponIcon} isPrimary />
            <Text isPrimary>35% off for Cheese Burger</Text>
          </Container>
          <Container style={styles.coupon}>
            <Icon name="tag" style={styles.couponIcon} isPrimary />
            <Text isPrimary>5% off for all items</Text>
          </Container> */}
        </Container>
      </Container>
    </Card>
  );
};

export default HeadingInformation;
