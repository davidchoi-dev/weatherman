import { APICore } from '@/api/APICore';
import { ENV } from '@/constants';

class APIOpenWeather extends APICore {
  constructor (options = {}, key = '') {
    super(options, key);
  }

  fetchWeatherByGeoLocation ({ lng, lat }) {
    return this._get('', {
      lat,
      lon: lng,
      appid: this.token,
    });
  }

  fetchWeatherByCity (cityName) {
    console.log(cityName);
    return this._get('', {
      q: cityName,
      appid: this.token,
    });
  }
}

export default new APIOpenWeather({
  baseURL: 'https://api.openweathermap.org/data/2.5/weather',
}, ENV.OPEN_WEATHER_API_KEY);
