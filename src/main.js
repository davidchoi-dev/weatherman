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
  SET_WEATHER,
  FETCH_WEATHER_BY_GEO,
  FETCH_WEATHER_BY_CITY
} from 'stores/configs';
import Storage from '@/helpers/Storage';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

async function locationInitialize () {
  // Find Geo
  try {
    const storedCity = Storage.getCity();
    const storedWeather = Storage.getWeather();
    if (storedCity) {
      store.commit(SET_CITY, storedCity);
    }

    if (storedWeather) {
      store.commit(SET_WEATHER, storedWeather);
    }
    else {
      if (storedCity) {
        await store.dispatch(FETCH_WEATHER_BY_CITY, storedCity);
      }
      else {
        await store.dispatch(SET_GEO_LOCATION);
        await store.dispatch(FETCH_WEATHER_BY_GEO);
      }
    }
  }
  catch (e) {
    console.error(e);
  }
};

locationInitialize();
