import {
  SET_GEOLOCATION,
  FETCH_WEATHER_BY_GEO,
  FETCH_WEATHER_BY_CITY,
  IS_VALID_GEO_LOCATION,
  SET_WEATHER,
  SET_CURRENT_CITY
} from 'stores/configs';
import APIOpenWeather from '@/api/APIOpenWeather';
import { OPEN_WEATHERS } from '@/constants';

const geoLocationPromise = function (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const actions = {
  async [SET_GEOLOCATION] ({ commit }) {
    try {
      const { coords } = await geoLocationPromise();
      if (typeof coords.latitude !== 'number' || typeof coords.longitude !== 'number') {
        console.error(`Not allowed geo location (lat: ${coords.latitude}, lng: ${coords.longitude})`);
        throw new Error('NOT_VALID_COORDS');
      }
      commit(SET_GEOLOCATION, {
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      return coords;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_WEATHER_BY_GEO] ({ commit, state, getters }) {
    const isValidGeo = getters[IS_VALID_GEO_LOCATION];
    if (!isValidGeo) {
      throw new Error('NOT_VALID_GEO_LOCATION');
    }
    try {
      const { latitude: lat, longitude: lng } = state.geolocation;
      const { data } = await APIOpenWeather.fetchWeatherByGeoLocation({ lat, lng });
      commit(SET_CURRENT_CITY, data.name);
      commit(SET_WEATHER, data.weather[0]);
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_WEATHER_BY_CITY] ({ commit }, cityName = '') {
    if (!cityName) {
      return;
    }
    try {
      const { data } = await APIOpenWeather.fetchWeatherByCity(cityName);
      commit(SET_CURRENT_CITY, data.name);
      commit(SET_GEOLOCATION, {
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });

      const weatherCode = data.weather[0]
        ? data.weather[0].id
        : 1000;
      commit(SET_WEATHER, OPEN_WEATHERS[weatherCode]);
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },

};
