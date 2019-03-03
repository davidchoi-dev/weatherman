import Cookie from 'js-cookie';

class Storage {
  constructor () {
    this.CITY_KEY = 'city';
    this.WEATHER_KEY = 'weather';
  }

  saveCity (cityName = '') {
    if (localStorage) {
      localStorage.setItem(this.CITY_KEY, cityName);
    }
    else {
      Cookie.set(this.CITY_KEY, cityName);
    }
  }

  getCity () {
    if (localStorage) {
      return localStorage.getItem(this.CITY_KEY);
    }
    else {
      return Cookie.get(this.CITY_KEY);
    }
  }

  removeCity () {
    if (localStorage) {
      localStorage.removeItem(this.CITY_KEY);
    }
    else {
      Cookie.remove(this.CITY_KEY);
    }
  }

  saveWeather (weather = {}) {
    if (Object.keys(weather).length) {
      const stringified = JSON.stringify(weather);
      Cookie.set(this.WEATHER_KEY, stringified, {
        expires: 1 / 24,
      });
    }
  }

  getWeather () {
    const stringified = Cookie.get(this.WEATHER_KEY);
    if (stringified) {
      return JSON.parse(stringified);
    }
    else {
      return null;
    }
  }

  removeWeather () {
    Cookie.remove(this.WEATHER_KEY);
  }
}

export default new Storage();
