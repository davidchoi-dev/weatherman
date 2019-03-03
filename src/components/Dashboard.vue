<template>
  <div id="dashboard">
    <div>
      <h3>Your position is</h3>
      <br>
      <p>lat: {{ geolocation.latitude }}</p>
      <p>lng: {{ geolocation.longitude }}</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_GEO_LOCATION } from 'stores/configs';

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters({
      geolocation: GET_GEO_LOCATION,
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
