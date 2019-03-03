import {
  GET_GEO_LOCATION,
  HAS_VALID_GEO_LOCATION
} from 'stores/configs';

export const getters = {
  [GET_GEO_LOCATION] (state) {
    return state.geolocation;
  },
  [HAS_VALID_GEO_LOCATION] (state) {
    const { geolocation } = state;
    const { latitude, longitude } = geolocation;
    return latitude >= 0 && longitude >= 0;
  },
};
