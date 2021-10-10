import {createContext, useContext} from 'react';
import CommonStore from '~/store/common-store-impl';

export class  RootStore {
  common: CommonStore;

  constructor()  {
    this.common = new CommonStore();
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
