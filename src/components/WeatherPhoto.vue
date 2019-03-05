<template>
  <div id="weather-photo">
    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WeatherPhoto',
  computed: {
    ...mapState({
      photo: 'weatherPhoto',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
