<template>
  <div id="dashboard">
    <div v-show="userName">Hi, {{ userName }}</div>
    <div>
      <h3>Your position is</h3>
      <br>
      <p>lat: {{ geolocation.latitude }}</p>
      <p>lng: {{ geolocation.longitude }}</p>
      <p>city: {{ city }}</p>
      <p>weather: {{ weather }}</p>
      <p v-if="airQuality">aqi: {{ airQuality.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import WeatherPhoto from '@/components/WeatherPhoto';
import Login from '@/components/Login';

export default {
  name: 'Dashboard',
  components: { Login, WeatherPhoto },
  computed: {
    ...mapState({
      city: 'currentCity',
      weather: 'weather',
      airQuality: 'airQuality',
      geolocation: 'geolocation',
      userName: 'userName',
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
</style>
