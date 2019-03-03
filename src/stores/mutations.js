import {
  SET_GEO_LOCATION,
  SET_CITY,
  SET_WEATHER
} from 'stores/configs';
import Storage from '@/helpers/Storage';

export const mutations = {
  [SET_GEO_LOCATION] (state, { latitude, longitude }) {
    state.geolocation = { latitude, longitude };
  },
  [SET_CITY] (state, cityName = '') {
    if (cityName) {
      state.cityName = cityName;
      Storage.saveCity(cityName);
    }
  },
  [SET_WEATHER] (state, weather = {}) {
    if (Object.keys(weather).length > 0) {
      state.weather = weather;
      Storage.saveWeather(weather);
    }
  },
};
