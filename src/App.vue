<template>
  <div id="app">
    <WeatherPhoto />
    <transition name="fade">
      <Login v-if="needLogin" />
    </transition>
    <transition name=fade>
      <router-view v-if="!needLogin" />
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Login from '@/components/Login';
import { NEED_LOGIN } from 'stores/configs';
import WeatherPhoto from '@/components/WeatherPhoto';

export default {
  name: 'App',
  components: { WeatherPhoto, Login },
  computed: {
    ...mapGetters({
      needLogin: NEED_LOGIN,
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
