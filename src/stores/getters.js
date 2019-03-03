import { GET_GEO_LOCATION } from 'stores/configs';

export const getters = {
  [GET_GEO_LOCATION] (state) {
    return state.geolocation;
  },
};
