import { TEMPERATURE_UNITS } from '@/constants';

export const state = {
  geolocation: { latitude: -1, longitude: -1 },
  currentCity: null,
  cities: [],
  weather: null,
  airQuality: null,
  temperatureUnit: TEMPERATURE_UNITS.CELSIUS,
  userName: '',
  photos: [],
  now: new Date(),
  sunMovement: null,
};
