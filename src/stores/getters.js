import {
  IS_VALID_GEO_LOCATION,
  NEED_LOGIN
} from 'stores/configs';

export const getters = {
  [IS_VALID_GEO_LOCATION] (state) {
    const { geolocation } = state;
    const { latitude, longitude } = geolocation;
    return latitude >= 0 && longitude >= 0;
  },
  [NEED_LOGIN] (state, getters) {
    const invalidCity = !state.currentCity && getters[IS_VALID_GEO_LOCATION];
    const invalidUser = !state.userName;
    return invalidCity || invalidUser;
  },
};
