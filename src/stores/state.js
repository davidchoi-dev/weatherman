import { TEMPERATURE_UNITS } from '@/constants';

export const state = {
  geolocation: { latitude: -1, longitude: -1 },
  currentCity: null,
  currentPhoto: null,
  weather: null,
  airQuality: null,
  temperatureUnit: TEMPERATURE_UNITS.CELSIUS,
  userName: '',
  cities: [],
  photos: [],
  now: new Date(),
  sunMovement: null,
};
