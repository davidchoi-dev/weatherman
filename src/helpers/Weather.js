import { WEATHERS, AIR_QUALITIES } from '@/constants';

class Weather {
  getWeatherName (weatherCode = 1000) {
    if (weatherCode >= 200 && weatherCode < 233) {
      return WEATHERS.THUNDER_STORM;
    }
    else if (weatherCode >= 300 && weatherCode < 322) {
      return WEATHERS.DRIZZLE;
    }
    else if (weatherCode >= 500 && weatherCode < 532) {
      return WEATHERS.RAIN;
    }
    else if (weatherCode >= 600 && weatherCode < 623) {
      return WEATHERS.SNOW;
    }
    else if (weatherCode >= 701 && weatherCode < 782) {
      return WEATHERS.FOG;
    }
    else if (weatherCode === 800) {
      return WEATHERS.CLEAR;
    }
    else if (weatherCode >= 801 && weatherCode < 804) {
      return WEATHERS.CLOUDS;
    }
    else {
      return WEATHERS.UNKNOWN;
    }
  }

  getAirQualityName (aqi) {
    if (aqi < 51) {
      return AIR_QUALITIES.GOOD;
    }
    else if (aqi < 101) {
      return AIR_QUALITIES.NORMAL;
    }
    else if (aqi < 151) {
      return AIR_QUALITIES.CAUTION;
    }
    else if (aqi < 201) {
      return AIR_QUALITIES.BAD;
    }
    else if (aqi < 301) {
      return AIR_QUALITIES.VERY_BAD;
    }
    else if (aqi >= 301) {
      return AIR_QUALITIES.DANGER;
    }
    else {
      return AIR_QUALITIES.UNKNOWN;
    }
  }
}
export default new Weather();
