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
import { mapState } from 'vuex';

export default {
  name: 'WeatherPhotoInfo',
  computed: {
    ...mapState({
      photo: state => state.currentPhoto,
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
