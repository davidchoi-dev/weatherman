<template>
  <div class="city-search-form">
    <input v-model="cityName" type="text" @keyup="setShowCityList(true)" @keyup.enter="onEnter">
    <ul v-show="isShowCityList">
      <li
        v-for="city in filteredCities"
        :key="city.id"
        @click="setCityName(city.name)">
        {{ city.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CitySearchForm',
  data () {
    return {
      cityName: '',
      isShowCityList: false,
    };
  },
  computed: {
    filteredCities () {
      if (!this.cityName) {
        return [];
      }
      return this.cities.filter(city => city.name.includes(this.cityName));
    },
    ...mapState([ 'cities' ]),
  },
  methods: {
    setShowCityList (bool) {
      this.isShowCityList = bool;
    },
    setCityName (cityName) {
      this.cityName = cityName;
      this.setShowCityList(false);
    },
    onEnter () {
      this.$emit('change', this.cityName);
      this.setShowCityList(false);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
