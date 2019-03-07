<template>
  <div v-if="photo" class="weather-photo-info">
    <p data-name="author">
      <a :href="photo.link" target="_blank">
        <small>Photo by</small> {{ photo.author }}
      </a>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { GET_WEATHER_PHOTO } from '@/stores/configs';

export default {
  name: 'WeatherPhotoInfo',
  computed: {
    ...mapGetters({
      photo: GET_WEATHER_PHOTO,
    }),
  },
};
</script>

<style lang="scss" scoped>
  p[data-name="author"] {
    &:hover {
      opacity: 0.6;
    }
    small {
      font-size: 0.8rem;
    }
    a {
      color: #fff;
      text-decoration: none;
    }
  }
</style>
