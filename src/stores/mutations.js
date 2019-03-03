import { SET_GEO_LOCATION } from 'stores/configs';

export const mutations = {
  [SET_GEO_LOCATION] (state, position) {
    state.geolocation = position;
  },
};
