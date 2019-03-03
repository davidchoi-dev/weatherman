<template>
  <div id="app">
    <transition name="fade">
      <Login v-if="needLogin" />
    </transition>
    <transition name=fade>
      <router-view />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from '@/components/Login';
import {
  GET_CITY,
  IS_VALID_GEO_LOCATION
} from 'stores/configs';

export default {
  name: 'App',
  components: { Login },
  computed: {
    needLogin () {
      return !this.city && !this.isValidGeoLocation;
    },
    ...mapGetters({
      city: GET_CITY,
      isValidGeoLocation: IS_VALID_GEO_LOCATION,
    }),
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
