<template>
  <div id="login">
    <div class=login-form>
      <div v-show="step === 0">
        <h3>Where are you?</h3>
        <CitySearchForm @change="onChangeCityName" />
      </div>
      <div v-show="step === 1">
        <h3>What's your name?</h3>
        <input v-model="userName" type="text" @keyup.enter="close">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import {
  SET_USER_NAME,
  SET_CURRENT_CITY,
  FETCH_WEATHER_BY_CITY,
  FETCH_WEATHER_BY_GEO,
  SET_GEOLOCATION,
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
    onChangeCityName (cityName) {
      this.setCity(cityName);
      this.nextStep();
    },
    nextStep () {
      this.step = 1;
    },
    close () {
      this.setUser(this.userName);
      this.$emit('close');
    },
    ...mapMutations({
      setCity: SET_CURRENT_CITY,
      setUser: SET_USER_NAME,
      setGeolocation: SET_GEOLOCATION,
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
