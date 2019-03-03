// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import '@/styles/index.scss';
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './stores';
import {
  SET_GEO_LOCATION,
  SET_CITY,
  SET_WEATHER
} from 'stores/configs';
import { STORAGE_KEYS } from '@/constants';
import Storage from '@/helpers/Storage';
import axios from 'axios';

Vue.config.productionTip = false;

axios.get('https://openweathermap.org/data/2.5/find', {
  params: {
    q: 'Lon',
    appid: '6fadbcaae085a7bac35e0e4ae59e8dd7',
    type: 'like',
    sort: 'population',
    cnt: 20,
    callback: 'callback',
  },
}).then(res => {
  console.log(res);
}).catch(e => {
  console.error(e);
});

function callback (a) {
  console.log(a);
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

function locationInitialize () {
  // Find Geo
  const storedCity = Storage.getItem(STORAGE_KEYS.CITY);
  const storedWeather = Storage.getItem(STORAGE_KEYS.WEATHER);
  const storedGeo = Storage.getItem(STORAGE_KEYS.GEO);

  if (storedCity) {
    store.commit(SET_CITY, storedCity);
  }
  if (storedGeo) {
    store.commit(SET_GEO_LOCATION, storedGeo);
  }
  if (storedWeather) {
    store.commit(SET_WEATHER, storedWeather);
  }
};

locationInitialize();
