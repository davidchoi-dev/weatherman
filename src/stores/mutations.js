import { SET_GEO_LOCATION } from 'stores/configs';

export const mutations = {
  [SET_GEO_LOCATION] (state, position) {
    if (!position.coords) {
      throw new Error('There is not coords object in position');
    }
    else if (typeof position.coords.latitude !== 'number' || typeof position.coords.longitude !== 'number') {
      const { coords } = position;
      throw new Error(`Not allowed geo location (lat :${coords.latitude}, lng: ${coords.longitude})`);
    }
    else {
      const { coords } = position;
      state.geolocation = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };
    }
  },
};
