import { APICore } from '@/api/APICore';
import { ENV } from '@/constants';

class APIOpenWeather extends APICore {
  constructor (options = {}, key = '') {
    super(options, key);
  }

  fetchWeatherByGeoLocation ({ latitude, longitude }) {
    return this._get('', {
      lat: latitude,
      lon: longitude,
      appid: this.token,
    });
  }

  fetchWeatherByCity (cityId) {
    return this._get('', {
      id: cityId,
      appid: this.token,
    });
  }
}

export default new APIOpenWeather({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
}, ENV.OPEN_WEATHER_API_KEY);
