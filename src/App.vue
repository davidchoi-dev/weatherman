<template>
  <div id="app">
    <transition name="fade" appear>
      <WeatherPhoto />
    </transition>
    <transition-group name="fade" appear>
      <Login v-if="needLogin" key="login" />
      <router-view v-else key="routerView" />
    </transition-group>
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
