import { APICore } from '@/api/APICore';
import { ENV } from '@/constants';

class APIAirQuality extends APICore {
  constructor (options = {}, key = '') {
    super(options, key);
  }

  fetchAirQuality ({ latitude, longitude }) {
    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return;
    }
    const endpoint = `/feed/geo:${latitude};${longitude}/`;
    return this._get(endpoint, {
      token: this.token,
    });
  }
}

export default new APIAirQuality({
  baseURL: 'https://api.waqi.info',
}, ENV.AQI_API_KEY);
