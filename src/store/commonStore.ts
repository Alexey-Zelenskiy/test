import {makeAutoObservable} from 'mobx';
import {ColorSchemeName} from 'react-native';

class CommonStore {
  isLoading: boolean = false;
  theme: ColorSchemeName = 'light';
  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.isLoading = value;
  }

  setTheme(theme: ColorSchemeName) {
    this.theme = theme;
  }
}

export default CommonStore;
