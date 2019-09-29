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
  UPDATE_TIME,
  START_CLOCK,
  RESET_CURRENT_CITY,
  DESTROY_CURRENT_CITY,
  DESTROY_GEOLOCATION,
  SET_WEATHER_PHOTO
} from 'stores/configs';
import APIOpenWeather from '@/api/APIOpenWeather';
import APIAirQuality from '@/api/APIAirQuality';
import WeatherHelper from '@/helpers/Weather';
import { TIME_UPDATE_INTERVAL, WEATHERS } from '@/constants';
import { GET_DAY_NIGHT } from '@/stores/configs';

const geoLocationPromise = function (options = {}) {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const actions = {
  [START_CLOCK] ({ commit }) {
    setInterval(() => {
      commit(UPDATE_TIME);
    }, TIME_UPDATE_INTERVAL);
  },
  [SET_WEATHER] ({ commit, state }, weather) {
    if (!weather) {
      throw new Error('there is no weather data!');
    }
    weather.name = WeatherHelper.getWeatherName(weather.id);
    commit(SET_WEATHER, weather);
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
      const weather = data.weather[0];
      weather.temp = data.main.temp;
      if (data.sys.sunrise && data.sys.sunset) {
        weather.sunMovement = {
          sunrise: new Date(data.sys.sunrise * 1000),
          sunset: new Date(data.sys.sunset * 1000),
        };
      }

      dispatch(SET_WEATHER, weather);
      dispatch(FETCH_AIR_QUALITY_BY_CITY, { latitude, longitude });

      let city = state.cities.find(city => city.id === data.id);
      if (!city) {
        city = {
          id: data.id,
          name: data.name,
          country: data.sys.country,
        };
      }
      commit(SET_CURRENT_CITY, city);

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
      const { lat: latitude, lon: longitude } = data.coord;
      const weather = data.weather[0];
      weather.temp = data.main.temp;
      if (data.sys.sunrise && data.sys.sunset) {
        weather.sunMovement = {
          sunrise: new Date(data.sys.sunrise * 1000),
          sunset: new Date(data.sys.sunset * 1000),
        };
      }

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
  [RESET_CURRENT_CITY] ({ commit }) {
    commit(DESTROY_CURRENT_CITY);
    commit(DESTROY_GEOLOCATION);
  },
  [SET_WEATHER_PHOTO] ({ state, commit, getters }) {
    const { photos, weather } = state;
    if (!photos.length) {
      commit(SET_WEATHER_PHOTO, null);
      return;
    }
    const currentWeatherName = weather ? weather.name : WEATHERS.UNKNOWN;
    const currentDayNight = getters[GET_DAY_NIGHT];
    const avilabledPhotos = photos.filter(photo => {
      const hasWeather = photo.weathers.some(weather => weather === currentWeatherName);
      if (!hasWeather) {
        return false;
      }
      return photo.dayNight.some(dn => dn === currentDayNight);
    });

    const randomCount = Math.floor(Math.random() * avilabledPhotos.length);
    console.log(avilabledPhotos);
    commit(SET_WEATHER_PHOTO, avilabledPhotos[randomCount]);
  },
};
