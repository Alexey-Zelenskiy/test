import {createContext, useContext} from 'react';
import CommonStore from '~/store/commonStore';
import AuthStore from '~/store/authStore';
import RestaurantsStore from './restaurantsStore';

export class RootStore {
  common: CommonStore;
  auth: AuthStore;
  restaurants: RestaurantsStore;

  constructor() {
    this.common = new CommonStore();
    this.auth = new AuthStore();
    this.restaurants = new RestaurantsStore();
  }
}

const StoreContext = createContext<RootStore>({} as RootStore);
export const StoreProvider = StoreContext.Provider;

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
