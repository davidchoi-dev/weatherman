<template>
  <div id="dashboard">
    <div class="main-info">
      <Clock />
      <p
        data-name="userName"
        v-show="userName">
        {{ computedGreeting }}, {{ userName }}
      </p>
    </div>
    <WeatherViewer />
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import WeatherPhoto from '@/components/WeatherPhoto';
import { GET_DAY_NIGHT } from '@/stores/configs';
import Clock from '@/components/Clock';
import WeatherViewer from '@/components/WeatherViewer';
import { DAY_NIGHT } from '@/constants';

export default {
  name: 'Dashboard',
  components: { WeatherPhoto, Clock, WeatherViewer },
  computed: {
    computedGreeting () {
      if (this.dayNight === DAY_NIGHT.DAY) {
        return 'Good day';
      }
      else if (this.dayNight === DAY_NIGHT.NIGHT) {
        return 'Good Evening';
      }
      else {
        return 'Hi';
      }
    },
    ...mapState({
      userName: 'userName',
    }),
    ...mapGetters({
      dayNight: GET_DAY_NIGHT,
    }),
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  height: 100vh;
  text-align: center;
  margin: 2rem;
  color: #fff;
}
.main-info {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  p[data-name="userName"] {
    text-align: center;
    font-size: 2.5rem;
  }
}
.weather-viewer {
  float: right;
}
</style>
