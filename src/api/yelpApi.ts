import axios from 'axios';
import {IUserLocation} from '~/store/authStore';

const BASE_URL = 'https://api.yelp.com/v3/businesses';

const ACCESS_TOKEN =
  'otBln-IuAVz16gBjIGNg-fjhsUKXA-ftnwRcGqdGwuBfE5-l8HcbkPioKiSijozxri4qKEjXzH7FD7g3WodTaXIMC1N9WyYmBRd0MOEqMPBVyib11tLmXcxLeiI1YXYx';

export function fetchRestaurants(
  location: IUserLocation,
  radius: number = 5000,
  sortBy?: string,
) {
  const params = {
    limit: 50,
    latitude: 34.053002200475,
    longitude: -118.44401596967094,
    radius: radius,
    sorty_by: sortBy,
  };
  return axios
    .get(`${BASE_URL}/search`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      params: params,
    })
    .then((res) => res.data);
}

export function fetchRestaurantById(id: string) {
  return axios
    .get(`${BASE_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
    .then((res) => res.data);
}
