import {
  SET_GEOLOCATION,
  SET_GEOLOCATION_WITH_WEATHER,
  FETCH_WEATHER_BY_GEO,
  FETCH_WEATHER_BY_CITY,
  FETCH_AIR_QUALITY_BY_CITY,
  IS_VALID_GEO_LOCATION,
  SET_WEATHER,
  SET_CURRENT_CITY,
  SET_CURRENT_CITY_WITH_WEATHER,
  SET_AIR_QUALITY
} from 'stores/configs';
import APIOpenWeather from '@/api/APIOpenWeather';
import APIAirQuality from '@/api/APIAirQuality';

const geoLocationPromise = function (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const actions = {
  async [SET_GEOLOCATION_WITH_WEATHER] ({ commit, state, dispatch }) {
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
    }
    catch (e) {
      console.error(e);
    }
  },
  async [SET_CURRENT_CITY_WITH_WEATHER] ({ commit, dispatch }, city) {
    if (!city) {
      return;
    }
    commit(SET_CURRENT_CITY, city);
    try {
      await dispatch(FETCH_WEATHER_BY_CITY, city);
    }
    catch (e) {
      console.error(e);
    }
  },
  async [FETCH_WEATHER_BY_GEO] ({ commit, state, getters, dispatch }) {
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

      dispatch(FETCH_AIR_QUALITY_BY_CITY, city.name);

      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_WEATHER_BY_CITY] ({ commit, dispatch }, city) {
    if (!city.id || !city.name) {
      return;
    }
    try {
      const { data } = await APIOpenWeather.fetchWeatherByCity(city.id);
      commit(SET_GEOLOCATION, {
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      });
      commit(SET_WEATHER, data.weather[0]);

      dispatch(FETCH_AIR_QUALITY_BY_CITY, city);

      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_AIR_QUALITY_BY_CITY] ({ commit, state }, city) {
    if (!city.name) {
      return;
    }
    try {
      const { data } = await APIAirQuality.fetchAirQuality(city.name);
      if (data.status !== 'ok') {
        return;
      }
      commit(SET_AIR_QUALITY, data.data);
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
};
