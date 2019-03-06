import {
  GET_TEMPERATURE,
  IS_VALID_GEO_LOCATION,
  NEED_LOGIN,
  GET_TIME
} from 'stores/configs';
import { TEMPERATURE_UNITS, WEEK } from '@/constants';

const week = [WEEK.SUNDAY, WEEK.MONDAY, WEEK.TUESDAY, WEEK.WEDNESDAY, WEEK.THURSDAY, WEEK.FRIDAY, WEEK.SATURDAY];

export const getters = {
  [IS_VALID_GEO_LOCATION] (state) {
    const { geolocation } = state;
    const { latitude, longitude } = geolocation;
    return latitude >= 0 && longitude >= 0;
  },
  [NEED_LOGIN] (state, getters) {
    const invalidCity = !state.currentCity && !getters[IS_VALID_GEO_LOCATION];
    const invalidUser = !state.userName;
    return invalidCity || invalidUser;
  },
  [GET_TEMPERATURE] (state) {
    const {
      temperatureUnit: unit,
      weather,
    } = state;
    if (!weather || !weather.temp) {
      return;
    }

    const temp = weather.temp;
    let calcedTemp = temp; // Default unit is KELVIN
    if (unit === TEMPERATURE_UNITS.CELSIUS) {
      calcedTemp = temp - 273.15;
    }
    else if (unit === TEMPERATURE_UNITS.FAHRENHEIT) {
      calcedTemp = (temp - 273.15) * (9 / 5) + 32;
    }

    return parseFloat(calcedTemp.toFixed(2));
  },
  [GET_TIME] (state) {
    const { now } = state;
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = week[now.getDay()];
    const hour = now.getHours();
    const minutes = now.getMinutes();
    return {
      year, month, date, day, hour, minutes,
    };
  },
};
