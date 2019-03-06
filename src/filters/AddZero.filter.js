import Vue from 'vue';
Vue.filter('addZero', (number) => {
  if (typeof number !== 'number') {
    return number;
  }

  if (number < 10) {
    return `0${number}`;
  }
  else {
    return number.toString();
  }
});
