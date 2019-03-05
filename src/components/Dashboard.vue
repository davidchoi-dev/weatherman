<template>
  <div id="dashboard">
    <div>
      <h3>Your position is</h3>
      <br>
      <p>lat: {{ geolocation.latitude }}</p>
      <p>lng: {{ geolocation.longitude }}</p>
      <p>city: {{ city }}</p>
      <p>weather: {{ weather }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Dashboard',
  computed: {
    ...mapState({
      city: 'currentCity',
      weather: 'weather',
      geolocation: 'geolocation',
    }),
  },
};
</script>

<style lang="scss" scoped>
#dashboard {
  height: 100vh;
  text-align: center;
  margin: 2rem;
}
</style>
