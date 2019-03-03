import {
  GET_GEO_LOCATION,
  IS_VALID_GEO_LOCATION,
  GET_CITY,
  GET_WEATHER
} from 'stores/configs';

export const getters = {
  [GET_GEO_LOCATION] (state) {
    return state.geolocation;
  },
  [IS_VALID_GEO_LOCATION] (state) {
    const { geolocation } = state;
    const { latitude, longitude } = geolocation;
    return latitude >= 0 && longitude >= 0;
  },
  [GET_CITY] (state) {
    return state.cityName;
  },
  [GET_WEATHER] (state) {
    return state.weather;
  },
};
