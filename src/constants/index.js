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
