import {observable, action} from 'mobx';

class CommonStore {
  @observable isLoading: boolean = false;

  @action
  setLoading(value: boolean) {
    this.isLoading = value;
  }
}

export default CommonStore;
