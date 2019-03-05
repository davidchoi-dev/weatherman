<template>
  <div id="login">
    <div class=login-form>
      <transition-group name="fade-out-in" tag="div" appear>
        <div class="form-step" v-show="step === 0" key="username">
          <h3>Hi, There. Who are you?</h3>
          <input v-model="userName" type="text" @keyup.enter="onChangeUserName">
        </div>
        <div class="form-step" v-show="step === 1" key="location">
          <h3>Where are you? {{ userName }}</h3>
          <CitySearchForm @submit="onChangeCity" />
          <button @click="onClickCurrentLocation">Use current location</button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import {
  SET_USER_NAME,
  SET_CURRENT_CITY_WITH_WEATHER,
  SET_GEOLOCATION_WITH_WEATHER
} from 'stores/configs';
import CitySearchForm from '@/components/CitySearchForm';

export default {
  name: 'Login',
  components: { CitySearchForm },
  data () {
    return {
      userName: '',
      step: 0,
      test: 0,
    };
  },
  computed: {
    ...mapState({
      storedUserName: 'userName',
      storedCity: 'currentCity',
    }),
  },
  methods: {
    async onChangeCity (city) {
      try {
        await this.setCityWithWeather(city);
        this.close();
      }
      catch (e) {
        alert('Cannot find your city. click current location button');
        console.error(e);
      }
    },
    async onClickCurrentLocation () {
      try {
        await this.setGeolocationWithWeather();
        this.close();
      }
      catch (e) {
        alert('Cannot find your location');
        console.error(e);
      }
    },
    onChangeUserName () {
      if (!this.userName) {
        return;
      }

      this.setUser(this.userName);
      if (this.storedCity) {
        this.close();
      }
      else {
        this.nextStep();
      }
    },
    nextStep () {
      this.step = 1;
    },
    close () {
      this.$emit('close');
    },
    ...mapMutations({
      setUser: SET_USER_NAME,
    }),
    ...mapActions({
      setCityWithWeather: SET_CURRENT_CITY_WITH_WEATHER,
      setGeolocationWithWeather: SET_GEOLOCATION_WITH_WEATHER,
    }),
  },
  beforeMount () {
    if (this.storedUserName) {
      this.userName = this.storedUserName;
      this.nextStep();
    }
  },
};
</script>

<style lang="scss" scoped>
$font-size: 2.5rem;

#login {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
}
.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 40%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
}
.city-search-form {
  width: 100%;
}
h3 {
  font-size: $font-size;
  font-weight: bold;
  margin-bottom: $font-size;
}
input, /deep/ input {
  width: 100%;
  padding: 0.5rem 0;
  font-size: $font-size;
  text-align: center;
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
button {
  margin-top: 1rem;
  border: 1px solid #fff;
  background-color: transparent;
  padding: 0.5rem;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  transition: opacity .5s;
  &:hover {
    opacity: 0.7;
  }
}
</style>
