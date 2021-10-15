import {makeAutoObservable} from 'mobx';

export interface IUserLocation {
  location: string;
  latitude: number;
  longitude: number;
}

class AuthStore {
  user: any = undefined;
  userLocation: IUserLocation | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  get isSignedIn() {
    return this.user !== undefined;
  }

  setUser(user: any) {
    this.user = user;
  }

  setUserLocation(userLocation: IUserLocation | undefined) {
    this.userLocation = userLocation;
  }
}

export default AuthStore;
