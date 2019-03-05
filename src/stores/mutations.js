import {
  SET_GEO_LOCATION,
  SET_CURRENT_CITY,
  SET_WEATHER,
  SET_CITIES,
  SET_USER_NAME
} from 'stores/configs';
import StorageHelper from '@/helpers/Storage';
import { WEATHERS, STORAGE_KEYS } from '@/constants';

export const mutations = {
  [SET_GEO_LOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
    Storage.setItem(STORAGE_KEYS.GEO, state.geolocation);
  },
  [SET_CURRENT_CITY] (state, cityName = '') {
    if (cityName) {
      state.cityName = cityName;
      StorageHelper.setItem(STORAGE_KEYS.CITY, state.cityName);
    }
  },
  [SET_WEATHER] (state, weather = WEATHERS.UNKNOWN) {
    state.weather = weather;
    Storage.setItem(STORAGE_KEYS.WEATHER, state.weather, 1 / 24);
  },
  [SET_CITIES] (state, cities) {
    state.cities = cities;
  },
  [SET_USER_NAME] (state, userName = '') {
    if (userName) {
      state.userName = userName;
      StorageHelper.setItem(STORAGE_KEYS.USER, state.userName);
    }
  },
};
