import { SET_GEO_LOCATION } from 'stores/configs';

export const actions = {
  async [SET_GEO_LOCATION] ({ commit }) {
    try {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log(position);
          commit(SET_GEO_LOCATION, position);
        });
      }
      else {
        throw new Error('GEO_LOCATION_NOT_SUPPORTED');
      }
    }
    catch (e) {
      return Promise.reject(e);
    }
  },
};
