import {makeAutoObservable} from 'mobx';

class CommonStore {
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }
}

export default CommonStore;
