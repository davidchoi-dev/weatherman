<template>
  <div class="city-search-form">
    <div class="city-input-wrapper">
      <input v-model="cityName" type="text" @keyup="onKeyup">
      <ul v-show="isShowCityList">
        <li
          v-for="city in filteredCityList"
          :key="city.id"
          @click="onClickCityList(city)">
          {{ city.name }}, {{ city.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import _ from 'lodash';

export default {
  name: 'CitySearchForm',
  data () {
    return {
      selectedCity: null,
      cityName: '',
      isShowCityList: false,
      filteredCityList: [],
    };
  },
  computed: {
    ...mapState([ 'cities' ]),
  },
  methods: {
    setShowCityList (bool) {
      this.isShowCityList = bool;
    },
    onClickCityList (city) {
      this.cityName = city.name;
      this.selectedCity = city;
      this.setShowCityList(false);
      this.submit();
    },
    onKeyup: _.debounce(function () {
      this.updateFilteredCityList();
      this.setShowCityList(true);
    }, 500),
    updateFilteredCityList () {
      if (!this.cityName) {
        this.filteredCityList = [];
        this.setShowCityList(false);
      }
      else {
        this.filteredCityList = this.cities.filter(city => {
          const cityNameInList = city.name.toUpperCase();
          const insertedCityName = this.cityName.toUpperCase();
          return cityNameInList.includes(insertedCityName);
        });
      }
    },
    submit () {
      this.$emit('submit', this.selectedCity);
      this.cityName = '';
      this.filteredCityList = [];
      this.setShowCityList(false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .city-input-wrapper {
    width: 100%;
    position: relative;
  }
  input {
    width: 100%;
  }
  ul {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    max-height: 200px;
    overflow-y: scroll;
    z-index: 10;
    li {
      cursor: pointer;
      margin: 1rem 0;
      font-size: 1.2rem;
      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>
