<template>
  <div class="city-search-form">
    <div class="city-input-wrapper">
      <input v-model="cityName" type="text" @keyup="onKeyup" @keyup.enter="submit">
      <ul v-show="isShowCityList">
        <li
          v-for="city in filteredCityList"
          :key="city.id"
          @click="onClickCityList(city.name)">
          {{ city.name }}
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
    onClickCityList (cityName) {
      this.cityName = cityName;
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
        this.filteredCityList = this.cities.filter(city => city.name.includes(this.cityName));
      }
    },
    submit () {
      this.$emit('submit', this.cityName);
      this.cityName = '';
      this.filteredCityList = [];
      this.setShowCityList(false);
    },
  },
};
</script>

<style lang="scss" scoped>
  .city-input-wrapper {
    position: relative;
  }
  ul {
    position: absolute;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    max-height: 200px;
    overflow-y: scroll;
    li {
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
  }
</style>
