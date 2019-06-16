<template>
  <div class="weather-viewer">
    <div v-if="weather" data-name="weather">
      <div data-name="weatherIcon" :style="{ 'background-image': `url(${weatherIcon})` }"></div>
      <div data-name="temperature">
        <span data-name="value">{{ temperature }}</span>
        <span data-name="unit" v-html="temperatureSign"></span>
      </div>
    </div>
    <div v-if="city" data-name="location" @click="resetCurrentCity">{{ city.name }}, {{ city.country }}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import { GET_TEMPERATURE, GET_WEATHER_ICON, RESET_CURRENT_CITY } from '@/stores/configs';
import { TEMPERATURE_UNITS } from '@/constants';

export default {
  name: 'WeatherViewer',
  computed: {
    temperatureSign () {
      switch (this.temperatureUnit) {
        case TEMPERATURE_UNITS.KELVIN:
          return '&#8490;';
        case TEMPERATURE_UNITS.CELSIUS:
          return '&#8451;';
        case TEMPERATURE_UNITS.FAHRENHEIT:
          return '&#8457;';
        default:
          return '';
      }
    },
    ...mapState({
      city: 'currentCity',
      weather: 'weather',
      temperatureUnit: 'temperatureUnit',
    }),
    ...mapGetters({
      temperature: GET_TEMPERATURE,
      weatherIcon: GET_WEATHER_ICON,
    }),
  },
  methods: {
    ...mapActions({
      resetCurrentCity: RESET_CURRENT_CITY,
    }),
  },
};
</script>

<style lang="scss" scoped>
$weather-icon-size: 2rem;
.weather-viewer {
  display: inline-block;
}
div[data-name="weather"] {
  margin-bottom: .5rem;
}
div[data-name="weatherIcon"] {
  display: inline-block;
  width: $weather-icon-size;
  height: $weather-icon-size;
  background-size: cover;
  background-repeat: no-repeat;
  vertical-align: bottom;
}
div[data-name="temperature"] {
  display: inline-block;
  vertical-align: bottom;
  span {
    &[data-name="value"] {
      font-size: 1.5rem;
    }
    &[data-name="unit"] {
      font-size: 1rem;
      margin-left: -0.2rem;
    }
  }
}
div[data-name="location"] {
  text-align: right;
  cursor: pointer;
  transition: opacity .2s ease-in-out;
  &:hover {
    opacity: .7;
  }
}
</style>
