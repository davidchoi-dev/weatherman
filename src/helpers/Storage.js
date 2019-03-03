import Cookie from 'js-cookie';

class Storage {
  constructor () {
    this.CITY_KEY = 'city';
    this.WEATHER_KEY = 'weather';
    this.GEO_KEY = 'geo';
  }

  saveCity (cityName = '') {
    if (localStorage && cityName) {
      localStorage.setItem(this.CITY_KEY, cityName);
    }
    else if (cityName) {
      Cookie.set(this.CITY_KEY, cityName);
    }
    else {
      return false;
    }
  }

  getCity () {
    return localStorage
      ? localStorage.getItem(this.CITY_KEY)
      : Cookie.get(this.CITY_KEY);
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

  saveGeo (geo = {}) {
    const isValidGeo = !!Object.keys(geo).length;
    if (localStorage && isValidGeo) {
      localStorage.setItem(this.GEO_KEY, JSON.stringify(geo));
    }
    else if (isValidGeo) {
      Cookie.set(this.GEO_KEY, JSON.stringify(geo));
    }
    else {
      return false;
    }
  }

  getGeo () {
    const stringified = localStorage
      ? localStorage.getItem(this.GEO_KEY)
      : Cookie.get(this.GEO_KEY);
    return stringified
      ? JSON.parse(stringified)
      : null;
  }

  removeGeo () {
    if (localStorage) {
      localStorage.removeItem(this.GEO_KEY);
    }
    else {
      Cookie.remove(this.GEO_KEY);
    }
  }
}

export default new Storage();
