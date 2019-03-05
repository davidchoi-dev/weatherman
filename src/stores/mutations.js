import {
  SET_GEOLOCATION,
  SET_CURRENT_CITY,
  SET_WEATHER,
  SET_CITIES,
  SET_USER_NAME
} from 'stores/configs';
import StorageHelper from '@/helpers/Storage';
import { OPEN_WEATHERS, STORAGE_KEYS } from '@/constants';

export const mutations = {
  [SET_GEOLOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
    StorageHelper.setItem(STORAGE_KEYS.GEO, state.geolocation);
  },
  [SET_CURRENT_CITY] (state, city) {
    if (city) {
      state.currentCity = city;
      StorageHelper.setItem(STORAGE_KEYS.CITY, state.currentCity);
    }
  },
  [SET_WEATHER] (state, weather) {
    if (!weather) {
      throw new Error('there is no weather data!');
    }

    weather.name = OPEN_WEATHERS[weather.id];
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
