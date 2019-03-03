<template>
  <div id="login">
    <div class=login-form>
      <div v-show="step === 0">
        <h3>Where are you?</h3>
        <input v-model="cityName" type="text" @keyup.enter="nextStep">
      </div>
      <div v-show="step === 1">
        <h3>What's your name?</h3>
        <input v-model="userName" type="text" @keyup.enter="submit">
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_CITY } from 'stores/configs';

export default {
  name: 'Login',
  data () {
    return {
      cityName: '',
      userName: '',
      step: 0,
    };
  },
  methods: {
    nextStep () {
      this.step = 1;
    },
    submit () {
      this.setCity(this.cityName);
      this.$emit('close');
    },
    ...mapMutations({
      setCity: SET_CITY,
    }),
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
input {
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
