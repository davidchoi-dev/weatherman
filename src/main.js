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
  SET_USER_NAME
} from 'stores/configs';
import { STORAGE_KEYS } from '@/constants';
import Storage from '@/helpers/Storage';
import Cities from 'static/city.list.min';

Vue.config.productionTip = false;

function locationInitialize () {
  // Find Geo
  const storedCity = Storage.getItem(STORAGE_KEYS.CITY);
  const storedWeather = Storage.getItem(STORAGE_KEYS.WEATHER);
  const storedGeo = Storage.getItem(STORAGE_KEYS.GEO);
  const storedUser = Storage.getItem(STORAGE_KEYS.USER);

  if (storedCity) {
    store.commit(SET_CURRENT_CITY, storedCity);
  }
  if (storedGeo) {
    store.commit(SET_GEOLOCATION, storedGeo);
  }
  if (storedWeather) {
    store.commit(SET_WEATHER, storedWeather);
  }
  if (storedUser) {
    store.commit(SET_USER_NAME, storedUser);
  }
}
locationInitialize();
store.commit(SET_CITIES, Cities);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
