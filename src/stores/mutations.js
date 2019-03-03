import {
  SET_GEO_LOCATION,
  SET_CITY,
  SET_WEATHER
} from 'stores/configs';
import Storage from '@/helpers/Storage';
import { STORAGE_KEYS } from '@/constants';

export const mutations = {
  [SET_GEO_LOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
    Storage.setItem(STORAGE_KEYS.GEO, state.geolocation);
  },
  [SET_CITY] (state, cityName = '') {
    if (cityName) {
      state.cityName = cityName;
      Storage.setItem(STORAGE_KEYS.CITY, state.cityName);
    }
  },
  [SET_WEATHER] (state, weather = {}) {
    if (Object.keys(weather).length) {
      state.weather = weather;
      Storage.setItem(STORAGE_KEYS.WEATHER, state.weather, 1 / 24);
    }
  },
};
