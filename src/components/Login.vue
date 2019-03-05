<template>
  <div id="login">
    <div class=login-form>
      <div v-show="step === 0">
        <h3>Where are you?</h3>
        <CitySearchForm @change="onChangeCityName" />
        <button @click="onClickCurrentLocation">Current Location</button>
      </div>
      <div v-show="step === 1">
        <h3>What's your name?</h3>
        <input v-model="userName" type="text" @keyup.enter="onChangeUserName">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  SET_USER_NAME,
  SET_CURRENT_CITY,
  FETCH_WEATHER_BY_CITY,
  FETCH_WEATHER_BY_GEO,
  SET_GEOLOCATION
} from 'stores/configs';
import CitySearchForm from '@/components/CitySearchForm';

export default {
  name: 'Login',
  components: { CitySearchForm },
  data () {
    return {
      userName: '',
      step: 0,
    };
  },
  computed: {
    ...mapState({
      storedCity: 'currentCityName',
    }),
  },
  methods: {
    async onChangeCityName (cityName) {
      this.setCity(cityName);
      await this.fetchWeather();
      this.nextStep();
    },
    async onClickCurrentLocation () {
      try {
        await this.setGeolocation();
        await this.fetchWeatherByGeoLocation();
        this.nextStep();
      }
      catch (e) {
        alert('Cannot find your location');
        console.error(e);
      }
    },
    onChangeUserName () {
      this.setUser(this.userName);
      this.close();
    },
    nextStep () {
      this.step = 1;
    },
    async fetchWeather () {
      try {
        await this.fetchWeatherByCity();
      }
      catch (e) {
        alert('Cannot find weather of city use current location');
        console.error(e);
      }
    },
    close () {
      this.$emit('close');
    },
    ...mapMutations({
      setCity: SET_CURRENT_CITY,
      setUser: SET_USER_NAME,
    }),
    ...mapActions({
      setGeolocation: SET_GEOLOCATION,
      fetchWeatherByCity: FETCH_WEATHER_BY_CITY,
      fetchWeatherByGeoLocation: FETCH_WEATHER_BY_GEO,
    }),
  },
  created () {
    if (this.storedCity) {
      this.nextStep();
    }
  },
};
</script>

<style lang="scss" scoped>
#login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.6);
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
}
input, /deep/ input {
  background-color: transparent;
  border: {
    top: none;
    right: none;
    bottom: 1px solid #fff;
    left: none;
  }
  outline: none;
  caret-color: #fff;
  color: #fff;
}
</style>
