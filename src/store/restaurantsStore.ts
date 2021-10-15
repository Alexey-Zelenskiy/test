import {makeAutoObservable} from 'mobx';
import {fetchRestaurants} from '~/api/yelpApi';
import RestaurantsService from '~/services/restaurantsService';
import {IUserLocation} from './authStore';

class RestaurantsStore {
  restaurantsService: RestaurantsService = new RestaurantsService();
  restaurantsList: any[] | undefined = undefined;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchRestaurants(
    location: IUserLocation,
    radius?: number,
    sortBy?: string,
  ) {
    try {
      const restaurantsList: {businesses: any[]} =
        await this.restaurantsService.fetchRestaurants(
          location,
          radius,
          sortBy,
        );
      if (restaurantsList) {
        this.setRestaurants(restaurantsList?.businesses);
      }
    } catch (err) {
      return false;
    }
  }
  setRestaurants(restaurantsList: any[]) {
    this.restaurantsList = restaurantsList;
  }
}

export default RestaurantsStore;
