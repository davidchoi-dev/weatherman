<template>
  <div id="weather-photo">
    <div class="dimmed"></div>
    <div class="photo" :style="{ 'background-image': `url(${photo.image})` }"></div>
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
#weather-photo {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: #002244;
}
.photo {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 1;
}
.dimmed {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
