<template>
  <div id="dashboard">
    <!--<div v-show="userName">Hi, {{ userName }}</div>-->
    <!--<div>-->
      <!--<h3>Your position is</h3>-->
      <!--<br>-->
      <!--<p>lat: {{ geolocation.latitude }}</p>-->
      <!--<p>lng: {{ geolocation.longitude }}</p>-->
      <!--<p>city: {{ city }}</p>-->
      <!--<p>weather: {{ weather }}</p>-->
      <!--<p>temp: {{ temperature }}</p>-->
      <!--<p v-if="airQuality">aqi: {{ airQuality.name }}</p>-->
    <!--</div>-->
    <div class="main-info">
      <Clock />
      <div class="test" :style="{ 'background-image': `url(${weatherIcon})` }"></div>
      <p
        data-name="userName"
        v-show="userName">
        {{ computedGreeting }}, {{ userName }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import WeatherPhoto from '@/components/WeatherPhoto';
import Login from '@/components/Login';
import {
  GET_DAY_NIGHT,
  GET_TEMPERATURE,
  GET_WEATHER_ICON
} from '@/stores/configs';
import Clock from '@/components/Clock';
import { DAY_NIGHT } from '@/constants';

export default {
  name: 'Dashboard',
  components: { Login, WeatherPhoto, Clock },
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
      city: 'currentCity',
      weather: 'weather',
      airQuality: 'airQuality',
      geolocation: 'geolocation',
      userName: 'userName',
    }),
    ...mapGetters({
      temperature: GET_TEMPERATURE,
      dayNight: GET_DAY_NIGHT,
      weatherIcon: GET_WEATHER_ICON,
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
}
p[data-name="userName"] {
  text-align: center;
  font-size: 2.5rem;
}
div.test {
  width: 50px;
  height: 50px;
}
</style>
