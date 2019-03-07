import {
  GET_TEMPERATURE,
  IS_VALID_GEO_LOCATION,
  NEED_LOGIN,
  GET_TIME,
  GET_DAY_NIGHT,
  GET_WEATHER_ICON,
  GET_WEATHER_PHOTO
} from 'stores/configs';
import {
  DAY_NIGHT,
  TEMPERATURE_UNITS,
  WEEK,
  WEATHER_ICONS,
  WEATHERS
} from '@/constants';

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

    return Math.round(calcedTemp);
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
  [GET_DAY_NIGHT] (state) {
    const { weather, now } = state;
    if (!weather || !weather.sunMovement) {
      return DAY_NIGHT.UNKNOWN;
    }

    const { sunset } = weather.sunMovement;
    if (!sunset) {
      return DAY_NIGHT.UNKNOWN;
    }

    const nowTime = now.getTime();
    const sunsetTime = sunset.getTime();
    if (nowTime > sunsetTime) {
      return DAY_NIGHT.NIGHT;
    }
    else {
      return DAY_NIGHT.DAY;
    }
  },
  [GET_WEATHER_ICON] (state, getters) {
    const { weather } = state;
    if (!weather) {
      return '';
    }
    return WEATHER_ICONS[state.weather.name][getters[GET_DAY_NIGHT]];
  },
  [GET_WEATHER_PHOTO] (state, getters) {
    const { photos, weather } = state;
    if (!photos.length) {
      return null;
    }

    const currentWeatherName = weather ? weather.name : WEATHERS.UNKNOWN;
    const currentDayNight = getters[GET_DAY_NIGHT];
    console.log(currentWeatherName);

    const avilabledPhotos = photos.filter(photo => {
      const hasWeather = photo.weathers.some(weather => weather === currentWeatherName);
      if (!hasWeather) {
        return false;
      }

      return photo.dayNight.some(dn => dn === currentDayNight);
    });

    const randomCount = Math.floor(Math.random() * avilabledPhotos.length);
    return avilabledPhotos[randomCount];
  },
};
