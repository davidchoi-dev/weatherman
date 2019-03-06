import ProdConstants from '@/constants/prod';
import DevConstants from '@/constants/dev';
const isProduction = process.env.NODE_ENV === 'production';

export const ENV = isProduction ? ProdConstants : DevConstants;
export const STORAGE_KEYS = {
  CITY: 'CURRENT_CITY_INFO',
  WEATHER: 'WEATHER_INFO',
  GEO: 'GEO_INFO',
  USER: 'USER',
  AIR_QUALITY: 'AIR_QUALITY',
};
export const WEATHERS = {
  THUNDER_STORM: 'THUNDER_STORM',
  DRIZZLE: 'DRIZZLE',
  RAIN: 'RAIN',
  SNOW: 'SNOW',
  FOG: 'FOG',
  CLEAR: 'CLEAR',
  CLOUDS: 'CLOUDS',
  UNKNOWN: 'UNKNOWN',
};
export const AIR_QUALITIES = {
  GOOD: 'GOOD',
  NORMAL: 'NORMAL',
  CAUTION: 'CAUTION',
  BAD: 'BAD',
  VERY_BAD: 'VERY_BAD',
  DANGER: 'DANGER',
  UNKNOWN: 'UNKNOWN',
};
export const WEATHER_SAVE_EXPIRY = 1 / 24; // 1hour
export const TEMPERATURE_UNITS = {
  KELVIN: 'K',
  CELSIUS: 'C',
  FAHRENHEIT: 'F',
};
export const WEEK = {
  SUNDAY: 'SUN',
  MONDAY: 'MON',
  TUESDAY: 'TUE',
  WEDNESDAY: 'WED',
  THURSDAY: 'THU',
  FRIDAY: 'FRI',
  SATURDAY: 'SAT',
};
export const DAY_NIGHT = {
  DAY: 'DAY',
  NIGHT: 'NIGHT',
  UNKNOWN: 'UNKNOWN',
};
export const TIME_UPDATE_INTERVAL = 15000; // 30s
export const WEATHER_ICONS = (function () {
  const result = {};
  const basePath = 'static/icons/weather-icons';
  Object.keys(WEATHERS).forEach(weatherKey => {
    const weather = WEATHERS[weatherKey];
    result[weather] = {};
    Object.keys(DAY_NIGHT).forEach(dayNightKey => {
      const dayNight = DAY_NIGHT[dayNightKey];
      result[weather][dayNight] = `${basePath}/${weather.toLowerCase()}/${dayNight.toLowerCase()}.svg`;
    });
  });
  return result;
})();
