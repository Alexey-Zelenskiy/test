import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Animated, Dimensions, SafeAreaView, View } from 'react-native';
import { RestaurantDetailsScreenProps } from '~/navigators/RootStackNavigator/RootStackNavigator';
import HeadingInformation from './HeadingInformation';
import styles from './styles';
import GS from '~/styles';
import { useStore } from '~/store';

import Carousel from '~/components/elements/Carousel';
import Card from '~/components/elements/Card';
import Section from '~/components/elements/Section';


const RestaurantDetails: React.FC<RestaurantDetailsScreenProps> = observer(({ route }) => {

  const { id } = route.params;

  const store = useStore()
  const { restaurants } = store
  const { fetchRestaurantById, restaurantDetails } = restaurants
  const [scrollY] = React.useState(new Animated.Value(0));

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  });

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  });

  useEffect(() => {
    store.restaurants.fetchRestaurantById(id)
  }, [id, store])



  return (
    <GS.SafeAreaView>
      <View style={styles.tabSectionListContainer}>
        {restaurantDetails ?
          <>
            <Animated.View
              style={[
                styles.coverPhotoContainer,
                {
                  transform: [
                    {
                      translateY: coverTranslateY,
                    },
                  ],
                },
              ]}>
              {restaurantDetails.image_url && (
                <Animated.Image
                  source={{ uri: restaurantDetails.image_url }}
                  style={[
                    styles.coverPhoto,
                    {
                      transform: [
                        {
                          scale: coverScale,
                        },
                      ],
                    },
                  ]}
                />
              )}
            </Animated.View>
            <HeadingInformation item={restaurantDetails} />
          </> : null
        }
      </View>
      <Section
        title="Photos"
      >
        <Carousel
          data={restaurantDetails?.photos}
          itemWidth={Dimensions.get('window').width / 1.65}
          renderContent={(item: string, _, parallaxProps) => {
            return (
              <Card
                coverImage={{ uri: item }}
                parallaxProps={parallaxProps}
              />
            );
          }}
        />
      </Section>
    </GS.SafeAreaView >
  );
});

export default RestaurantDetails;
