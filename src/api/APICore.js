import axios from 'axios';

export class APICore {
  constructor (options = {}, token = '') {
    this.token = token;
    this.axios = axios.create(options);
  }
  async _get (uri, params) {
    try {
      return await this.axios.get(uri, { params });
    }
    catch (e) {
      return Promise.reject(e);
    }
  }
};
