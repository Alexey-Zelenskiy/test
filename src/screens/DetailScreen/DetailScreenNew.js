import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
import yelp from '../../api/yelp';

function DetailScreen({route}) {
  const {id} = route.params;
  const [details, setDetails] = useState(null);
  const [errMessage, setErrMessage] = useState('');

  console.log(details);
  const getDetails = async () => {
    try {
      const response = await yelp.get(`/${id}`);
      setDetails(response.data);
    } catch (err) {
      setErrMessage('Something went wrong');
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  if (!details) {
    return null;
  }
  return (
    <ScrollView style={styles.containerStyle}>
      {errMessage ? <Text>{errMessage}</Text> : null}
      <FlatList
        //showsHorizontalScrollIndicator={false}
        //horizontal
        data={details.photos}
        keyExtractor={(photo) => photo}
        renderItem={({item}) => {
          return <Image style={styles.imgStyle} source={{uri: item}} />;
        }}
      />
      <View style={styles.nameContainerStyle}>
        <Text style={styles.nameStyle}>{details.name}</Text>
        {details.is_closed ? (
          <Text style={styles.closedStyle}>Closed</Text>
        ) : (
          <Text style={styles.openStyle}>Open</Text>
        )}
      </View>
      <Text style={styles.ratingStyle}>
        {details.rating} Stars, {details.review_count} Reviews
      </Text>

      <Text>Tel: {details.display_phone}</Text>
      <Text>
        Adress: {details.location.display_address[0]},{' '}
        {details.location.display_address[1]}
      </Text>
    </ScrollView>
  );
}

//<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

const styles = StyleSheet.create({
  containerStyle: {
    marginLeft: 12,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  nameContainerStyle: {
    flexDirection: 'row',
    flex: 1,
  },
  imgStyle: {
    width: 330,
    height: 200,
    borderRadius: 4,
    marginVertical: 10,
    marginRight: 5,
  },
  nameStyle: {
    fontWeight: 'bold',
    marginRight: 4,
  },
  ratingStyle: {
    color: 'grey',
  },
  openStyle: {
    color: 'green',
  },
  closedStyle: {
    color: 'red',
  },
});
export default DetailScreen;
