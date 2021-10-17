import {makeAutoObservable} from 'mobx';
import {fetchRestaurants, fetchRestaurantById} from '~/api/yelpApi';
import {IUserLocation} from './authStore';

class RestaurantsStore {
  restaurantsList: any[] | undefined = undefined;
  restaurantDetails: any | undefined = undefined;
  isLoading: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }

  async fetchRestaurants(
    location: IUserLocation,
    radius?: number,
    sortBy?: string,
  ) {
    try {
      this.setLoading(true);
      const restaurantsList: {businesses: any[]} = await fetchRestaurants(
        location,
        radius,
        sortBy,
      );
      if (restaurantsList) {
        this.setRestaurants(restaurantsList?.businesses);
        this.setLoading(false);
      }
    } catch (err) {
      return;
    }
  }

  setRestaurants(restaurantsList: any[]) {
    this.restaurantsList = restaurantsList;
  }

  async fetchRestaurantById(id: string) {
    try {
      this.setLoading(true);
      const restaurantDetails = await fetchRestaurantById(id);
      if (restaurantDetails) {
        this.setRestaurantsDetails(restaurantDetails);
        this.setLoading(false);
      }
    } catch (err) {
      return;
    }
  }

  setRestaurantsDetails(restaurantDetails: any) {
    this.restaurantDetails = restaurantDetails;
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }
}

export default RestaurantsStore;
