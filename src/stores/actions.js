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
  SET_AIR_QUALITY,
  SET_WEATHER_PHOTO
} from 'stores/configs';
import APIOpenWeather from '@/api/APIOpenWeather';
import APIAirQuality from '@/api/APIAirQuality';
import WeatherHelper from '@/helpers/Weather';

const geoLocationPromise = function (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const actions = {
  [SET_WEATHER] ({ commit, state }, weather) {
    if (!weather) {
      throw new Error('there is no weather data!');
    }
    weather.name = WeatherHelper.getWeatherName(weather.id);
    commit(SET_WEATHER, weather);
    commit(SET_WEATHER_PHOTO, weather.name);
  },
  [SET_AIR_QUALITY] ({ commit }, airQuality) {
    if (airQuality) {
      airQuality.name = WeatherHelper.getAirQualityName(airQuality.aqi);
      commit(SET_AIR_QUALITY, airQuality);
    }
  },
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
      const { latitude, longitude } = state.geolocation;
      const { data } = await APIOpenWeather.fetchWeatherByGeoLocation({ latitude, longitude });
      const city = state.cities.find(city => city.id === data.id);
      const weather = data.weather[0];
      weather.temp = data.main.temp;

      commit(SET_CURRENT_CITY, city);
      dispatch(SET_WEATHER, weather);
      dispatch(FETCH_AIR_QUALITY_BY_CITY, { latitude, longitude });

      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_WEATHER_BY_CITY] ({ commit, state, dispatch }, city) {
    if (!city.id || !city.name) {
      return;
    }
    try {
      const { data } = await APIOpenWeather.fetchWeatherByCity(city.id);
      const { lat: latitude, lon: longitude } = data.coord;
      const weather = data.weather[0];
      weather.temp = data.main.temp;

      commit(SET_GEOLOCATION, { latitude, longitude });
      dispatch(SET_WEATHER, weather);
      dispatch(FETCH_AIR_QUALITY_BY_CITY, { latitude, longitude });

      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
  async [FETCH_AIR_QUALITY_BY_CITY] ({ dispatch }, { latitude, longitude }) {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return;
    }
    try {
      const { data } = await APIAirQuality.fetchAirQuality({ latitude, longitude });
      if (data.status !== 'ok') {
        return;
      }
      dispatch(SET_AIR_QUALITY, {
        aqi: data.data.aqi,
        iaqi: data.data.iaqi,
      });
      return data;
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
};
