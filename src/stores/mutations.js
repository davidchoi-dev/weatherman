import {
  SET_GEOLOCATION,
  SET_CURRENT_CITY,
  SET_WEATHER,
  SET_CITIES,
  SET_USER_NAME
} from 'stores/configs';
import StorageHelper from '@/helpers/Storage';
import { WEATHERS, STORAGE_KEYS } from '@/constants';

export const mutations = {
  [SET_GEOLOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
    StorageHelper.setItem(STORAGE_KEYS.GEO, state.geolocation);
  },
  [SET_CURRENT_CITY] (state, cityName = '') {
    if (cityName) {
      state.currentCityName = cityName;
      StorageHelper.setItem(STORAGE_KEYS.CITY, state.currentCityName);
    }
  },
  [SET_WEATHER] (state, weather = WEATHERS.UNKNOWN) {
    state.weather = weather;
    StorageHelper.setItem(STORAGE_KEYS.WEATHER, state.weather, 1 / 24);
  },
  [SET_CITIES] (state, cities) {
    if (state.cities.length) {
      return;
    }
    state.cities = cities;
  },
  [SET_USER_NAME] (state, userName = '') {
    if (userName) {
      state.userName = userName;
      StorageHelper.setItem(STORAGE_KEYS.USER, state.userName);
    }
  },
};
