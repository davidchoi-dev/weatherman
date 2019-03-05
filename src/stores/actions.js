import {
  SET_GEOLOCATION,
  SET_GEOLOCATION_WITH_WEATHER,
  FETCH_WEATHER_BY_GEO,
  FETCH_WEATHER_BY_CITY,
  IS_VALID_GEO_LOCATION,
  SET_WEATHER,
  SET_CURRENT_CITY,
  SET_CURRENT_CITY_WITH_WEATHER
} from 'stores/configs';
import APIOpenWeather from '@/api/APIOpenWeather';

const geoLocationPromise = function (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const actions = {
  async [SET_GEOLOCATION_WITH_WEATHER] ({ commit, dispatch }) {
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
      await dispatch(FETCH_WEATHER_BY_GEO);
      return coords;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [SET_CURRENT_CITY_WITH_WEATHER] ({ commit, dispatch }, city) {
    if (!city) {
      return;
    }
    commit(SET_CURRENT_CITY, city);
    try {
      await dispatch(FETCH_WEATHER_BY_CITY, city.id);
    }
    catch (e) {
      console.error(e);
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
      const city = state.cities.find(city => city.id === data.id);
      commit(SET_CURRENT_CITY, city);
      commit(SET_WEATHER, data.weather[0]);
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_WEATHER_BY_CITY] ({ commit }, cityId) {
    if (!cityId) {
      return;
    }
    try {
      const { data } = await APIOpenWeather.fetchWeatherByCity(cityId);
      commit(SET_GEOLOCATION, {
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });
      commit(SET_WEATHER, data.weather[0]);
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },

};
