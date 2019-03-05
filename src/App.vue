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
import { NEED_LOGIN } from 'stores/configs';

export default {
  name: 'App',
  components: { Login },
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
