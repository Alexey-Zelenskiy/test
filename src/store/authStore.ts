import {makeAutoObservable} from 'mobx';

class AuthStore {
  user: any = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get isSignedIn() {
    return this.user !== undefined;
  }

  setUser(user: any) {
    this.user = user;
  }
}

export default AuthStore;
