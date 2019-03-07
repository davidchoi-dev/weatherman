<template>
  <div id="weather-photo">
    <div class="dimmed"></div>
    <transition name="fade" mode="out-in" appear>
      <div
        v-if="photo"
        class="photo"
        :style="{ 'background-image': `url(${photo.image}?q=10)` }">
        <div data-name="default"></div>
      </div>
      <div
        v-else
        class="photo"
        data-name="default">
        Default Photo: César Couto, unsplash
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_WEATHER_PHOTO } from '@/stores/configs';

export default {
  name: 'WeatherPhoto',
  computed: {
    ...mapGetters({
      photo: GET_WEATHER_PHOTO,
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
  &[data-name="default"] {
    background-image: url(/static/default-background.jpg);
    color: transparent;
  }
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
