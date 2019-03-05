// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/styles/index.scss';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './stores';
import {
  SET_GEOLOCATION,
  SET_CURRENT_CITY,
  SET_WEATHER,
  SET_CITIES,
  SET_USER_NAME,
  FETCH_WEATHER_BY_GEO,
  SET_AIR_QUALITY,
  SET_PHOTOS,
  SET_CURRENT_CITY_WITH_WEATHER
} from 'stores/configs';
import { STORAGE_KEYS } from '@/constants';
import Storage from '@/helpers/Storage';

// json
import Cities from 'static/city.list.min';
import Photos from 'static/photos';

Vue.config.productionTip = false;

async function locationInitialize () {
  const storedCity = Storage.getItem(STORAGE_KEYS.CITY);
  const storedWeather = Storage.getItem(STORAGE_KEYS.WEATHER, true);
  const storedGeo = Storage.getItem(STORAGE_KEYS.GEO);
  const storedUser = Storage.getItem(STORAGE_KEYS.USER);
  const storedAirQuality = Storage.getItem(STORAGE_KEYS.AIR_QUALITY, true);

  if (storedUser) {
    store.commit(SET_USER_NAME, storedUser);
  }
  if (storedCity && storedWeather) {
    store.commit(SET_CURRENT_CITY, storedCity);
    store.dispatch(SET_WEATHER, storedWeather);
    store.commit(SET_GEOLOCATION, storedGeo);
    store.dispatch(SET_AIR_QUALITY, storedAirQuality);
  }
  else if (storedCity) {
    await store.dispatch(SET_CURRENT_CITY_WITH_WEATHER, storedCity);
  }
  else if (storedGeo) {
    store.commit(SET_GEOLOCATION, storedGeo);
    await store.dispatch(FETCH_WEATHER_BY_GEO);
  }
}

(async function () {
  store.commit(SET_CITIES, Cities);
  store.commit(SET_PHOTOS, Photos);
  await locationInitialize();
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>',
  });
}());
