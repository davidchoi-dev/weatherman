import {
  SET_GEO_LOCATION,
  SET_CITY,
  SET_WEATHER
} from 'stores/configs';
import Storage from '@/helpers/Storage';

export const mutations = {
  [SET_GEO_LOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
    Storage.saveGeo(state.geolocation);
  },
  [SET_CITY] (state, cityName = '') {
    if (cityName) {
      state.cityName = cityName;
      Storage.saveCity(state.cityName);
    }
  },
  [SET_WEATHER] (state, weather = {}) {
    if (Object.keys(weather).length) {
      state.weather = weather;
      Storage.saveWeather(state.weather);
    }
  },
};
