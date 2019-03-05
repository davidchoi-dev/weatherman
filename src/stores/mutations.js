import {
  SET_GEOLOCATION,
  SET_CURRENT_CITY,
  SET_WEATHER,
  SET_CITIES,
  SET_USER_NAME,
  SET_AIR_QUALITY,
  SET_PHOTOS,
  SET_WEATHER_PHOTO
} from 'stores/configs';
import StorageHelper from '@/helpers/Storage';
import { STORAGE_KEYS, WEATHER_SAVE_EXPIRY } from '@/constants';

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
    state.weather = weather;
    StorageHelper.setItem(STORAGE_KEYS.WEATHER, state.weather, WEATHER_SAVE_EXPIRY);
  },
  [SET_AIR_QUALITY] (state, airQuality) {
    state.airQuality = airQuality;
    StorageHelper.setItem(STORAGE_KEYS.AIR_QUALITY, airQuality, WEATHER_SAVE_EXPIRY);
  },
  [SET_WEATHER_PHOTO] (state, weatherName) {
    const { photos } = state;
    if (!Object.keys(photos).length) {
      state.weatherPhoto = {};
      return;
    }
    const category = weatherName ? photos[weatherName] : photos.DEFAULT;
    const randomCount = Math.floor(Math.random() * category.length);
    state.weatherPhoto = category[randomCount];
  },
  [SET_CITIES] (state, cities) {
    if (state.cities.length) {
      return;
    }
    state.cities = cities;
  },
  [SET_PHOTOS] (state, photos) {
    if (state.photos.length) {
      return;
    }
    state.photos = photos;
    state.weatherPhoto = photos.DEFAULT[0];
  },
  [SET_USER_NAME] (state, userName = '') {
    if (userName) {
      state.userName = userName;
      StorageHelper.setItem(STORAGE_KEYS.USER, state.userName);
    }
  },
};
