import {fetchRestaurants} from '~/api/yelpApi';
import {IUserLocation} from '~/store/authStore';

export default class RestaurantsService {
  fetchRestaurants(location: IUserLocation, raduis?: number, sortBy?: string) {
    return fetchRestaurants(location, raduis, sortBy);
  }
}
