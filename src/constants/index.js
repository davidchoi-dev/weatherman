import ProdConstants from '@/constants/prod';
import DevConstants from '@/constants/dev';
const isProduction = process.env.NODE_ENV === 'production';

export const ENV = isProduction ? ProdConstants : DevConstants;
export const STORAGE_KEYS = {
  CITY: 'CURRENT_CITY_INFO',
  WEATHER: 'WEATHER_INFO',
  GEO: 'GEO_INFO',
  USER: 'USER',
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
export const OPEN_WEATHERS = {
  200: WEATHERS.THUNDER_STORM, // thunderstorm with light rain
  201: WEATHERS.THUNDER_STORM, // thunderstorm with rain
  202: WEATHERS.THUNDER_STORM, // thunderstorm with heavy rain
  210: WEATHERS.THUNDER_STORM, // light thunderstorm
  211: WEATHERS.THUNDER_STORM, // thunderstorm
  212: WEATHERS.THUNDER_STORM, // heavy thunderstorm
  221: WEATHERS.THUNDER_STORM, // ragged thunderstorm
  230: WEATHERS.THUNDER_STORM, // thunderstorm with light drizzle
  231: WEATHERS.THUNDER_STORM, // thunderstorm with drizzle
  232: WEATHERS.THUNDER_STORM, // thunderstorm with heavy drizzle
  300: WEATHERS.DRIZZLE, // light intensity drizzle
  301: WEATHERS.DRIZZLE, // drizzle
  302: WEATHERS.DRIZZLE, // heavy intensity drizzle
  310: WEATHERS.DRIZZLE, // light intensity drizzle rain
  311: WEATHERS.DRIZZLE, // drizzle rain
  312: WEATHERS.DRIZZLE, // heavy intensity drizzle rain
  313: WEATHERS.DRIZZLE, // shower rain and drizzle
  314: WEATHERS.DRIZZLE, // heavy shower rain and drizzle
  321: WEATHERS.DRIZZLE, // shower drizzle
  500: WEATHERS.RAIN, // light rain
  501: WEATHERS.RAIN, // moderate rain
  502: WEATHERS.RAIN, // heavy intensity rain
  503: WEATHERS.RAIN, // very heavy rain
  504: WEATHERS.RAIN, // extreme rain
  511: WEATHERS.RAIN, // freezing rain
  520: WEATHERS.RAIN, // light intensity shower rain
  521: WEATHERS.RAIN, // shower rain
  522: WEATHERS.RAIN, // heavy intensity shower rain
  531: WEATHERS.RAIN, // ragged shower rain
  600: WEATHERS.SNOW, // light snow
  601: WEATHERS.SNOW, // snow
  602: WEATHERS.SNOW, // heavy snow
  611: WEATHERS.SNOW, // sleet
  612: WEATHERS.SNOW, // shower sleet
  615: WEATHERS.SNOW, // light rain and snow
  616: WEATHERS.SNOW, // rain and snow
  620: WEATHERS.SNOW, // light shower snow
  621: WEATHERS.SNOW, // shower snow
  622: WEATHERS.SNOW, // heavy shower snow
  701: WEATHERS.FOG, // mist
  711: WEATHERS.FOG, // smoke
  721: WEATHERS.FOG, // haze
  731: WEATHERS.FOG, // sand, dust whirls
  741: WEATHERS.FOG, // fog
  751: WEATHERS.FOG, // sand
  761: WEATHERS.FOG, // dust
  762: WEATHERS.FOG, // volcanic ash
  771: WEATHERS.FOG, // squalls
  781: WEATHERS.FOG, // tornado
  800: WEATHERS.CLEAR, // clear sky
  801: WEATHERS.CLOUDS, // few clouds
  802: WEATHERS.CLOUDS, // scattered clouds
  803: WEATHERS.CLOUDS, // broken clouds
  804: WEATHERS.CLOUDS, // overcast clouds
  1000: WEATHERS.UNKNOWN,
};
