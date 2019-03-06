<template>
  <div class="air-quality-viewer">
    <div v-if="airQuality" data-name="airQuality">
      <p data-name="label">Air Quality</p>
      <p data-name="value">{{ airQuality.aqi }}</p>
      <p data-name="name">{{ airQuality.name }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'AirQualityViewer',
  computed: {
    ...mapState({
      airQuality: 'airQuality',
    }),
  },
};
</script>

<style lang="scss" scoped>
.air-quality-viwer {
  display: inline-block;
}
div[data-name="airQuality"] {
  text-align: center;
  p {
    margin-bottom: .5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
  p[data-name="value"] {
    font-size: 3rem;
  }
  p[data-name="name"] {
    font-size: 1.2rem;
    font-weight: bold;
  }
}
</style>
